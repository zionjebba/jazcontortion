import Mux from "@mux/mux-node";
import { prisma } from "./src/lib/prisma";
import * as dotenv from "dotenv";

dotenv.config();

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});



async function syncMuxVideos() {
  console.log("Checking for stuck uploads in the database...");
  const lessons = await prisma.lesson.findMany({
    where: { 
      muxPlaybackId: null, 
      muxUploadId: { not: null } 
    }
  });

  if (lessons.length === 0) {
    console.log("No stuck uploads found!");
    return;
  }

  for (const lesson of lessons) {
    try {
      console.log(`Checking Mux for upload ID: ${lesson.muxUploadId}`);
      const upload = await mux.video.uploads.retrieve(lesson.muxUploadId!);
      
      if (upload.asset_id) {
        const asset = await mux.video.assets.retrieve(upload.asset_id);
        const playbackId = asset.playback_ids?.[0]?.id;
        
        if (playbackId) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: {
              muxAssetId: asset.id,
              muxPlaybackId: playbackId,
              muxStatus: "ready"
            }
          });
          console.log(`✅ Success! Updated lesson "${lesson.title}" with playback ID: ${playbackId}`);
        } else {
          console.log(`⏳ Video is still processing on Mux servers...`);
        }
      } else {
        console.log(`⏳ Upload hasn't finished yet or asset not created.`);
      }
    } catch (e) {
      console.error("Error syncing lesson:", e);
    }
  }
}

syncMuxVideos()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
