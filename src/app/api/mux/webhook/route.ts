import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const secret = process.env.MUX_WEBHOOK_SECRET;

    if (!secret) {
      console.error("MUX_WEBHOOK_SECRET is not configured");
      return new NextResponse("Webhook configuration error.", { status: 500 });
    }

    const rawBody = await request.text();
    const signature = request.headers.get("mux-signature");

    if (!signature) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    const signaturesMatch =
      signatureBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

    if (!signaturesMatch) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    const event = JSON.parse(rawBody);

      // Raw SQL insert for idempotent webhooks to bypass missing generated types
      try {
        const result = await prisma.$executeRaw`
          INSERT INTO "WebhookEvent" (id)
          VALUES (${event.id})
          ON CONFLICT (id) DO NOTHING
        `;

        // 0 affected rows means duplicate
        if (typeof result === "number" && result === 0) {
          console.log(`Webhook ${event.id} already processed. Ignoring.`);
          return NextResponse.json({ message: "ignored" });
        }
      } catch (err) {
        // Fallback to conditional updates if table missing during migrations
        console.warn("WebhookEvent insert failed (continuing without persistent dedupe):", err);
      }

    if (event.type === "video.upload.asset_created") {
      const uploadId = event.data.id;
      const assetId = event.data.asset_id;


      await prisma.lesson.updateMany({
        where: { muxUploadId: uploadId, muxAssetId: null },
        data: { muxAssetId: assetId, muxStatus: "processing" },
      });
      return NextResponse.json({ success: true });
    }

    if (event.type === "video.asset.ready") {
      const assetId = event.data.id;
      const playbackId = event.data.playback_ids?.[0]?.id;

      if (playbackId) {
        await prisma.lesson.updateMany({
          where: { muxAssetId: assetId, OR: [{ muxPlaybackId: null }, { muxPlaybackId: { not: playbackId } }, { muxStatus: { not: "ready" } }] },
          data: { muxPlaybackId: playbackId, muxStatus: "ready" },
        });
      }
      return NextResponse.json({ success: true });
    }

    if (event.type === "video.asset.errored") {
      const assetId = event.data.id;
      await prisma.lesson.updateMany({
        where: { muxAssetId: assetId, muxStatus: { not: "error" } },
        data: { muxStatus: "error" },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: "ignored" });
  } catch (error) {
    console.error("Mux webhook failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
