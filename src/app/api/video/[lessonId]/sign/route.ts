import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function GET(request: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { lessonId } = await params;
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    });

    if (!lesson || !lesson.muxPlaybackId) {
      return new NextResponse("Video not found", { status: 404 });
    }

    const isEntitled = await prisma.entitlement.findUnique({
      where: {
        userId_programId: {
          userId: session.user.id,
          programId: lesson.module.programId,
        }
      }
    });

    if (!isEntitled && session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const signingKey = process.env.MUX_SIGNING_KEY;
    const privateKey = process.env.MUX_SIGNING_PRIVATE_KEY;

    if (!signingKey || !privateKey) {
      return new NextResponse("Server configuration error", { status: 500 });
    }

    const token = await mux.jwt.signPlaybackId(lesson.muxPlaybackId, {
      keyId: signingKey,
      keySecret: privateKey,
      expiration: "6h", 
    });

    return NextResponse.json({ token, playbackId: lesson.muxPlaybackId });
  } catch (error) {
    console.error("Failed to generate Mux token:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
