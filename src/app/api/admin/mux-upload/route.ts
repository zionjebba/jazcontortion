import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/require-admin-api";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function POST(request: Request) {
  try {
    const { errorResponse } = await requireAdminApi();
    if (errorResponse) return errorResponse;

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policy: ["signed"], // We only want signed playback for protected lessons
      },
      cors_origin: "*",
    });

    return NextResponse.json({
      uploadId: upload.id,
      url: upload.url,
    });
  } catch (error) {
    console.error("Mux Direct Upload generation failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
