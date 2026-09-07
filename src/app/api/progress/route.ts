import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  const formData = await request.formData();

  const lessonId = String(
    formData.get("lessonId") ?? "",
  );

  const slug = String(
    formData.get("slug") ?? "",
  );

  if (!lessonId || !slug) {
    return NextResponse.json(
      { error: "Missing lesson information." },
      { status: 400 },
    );
  }

  const entitlement = await prisma.entitlement.findFirst({
    where: {
      userId: session.user.id,
      program: {
        slug,
      },
    },
  });

  if (!entitlement) {
    return NextResponse.json(
      { error: "You do not have access to this program." },
      { status: 403 },
    );
  }

  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      module: {
        programId: entitlement.programId,
      },
    },
  });

  if (!lesson) {
    return NextResponse.json(
      { error: "Lesson not found." },
      { status: 404 },
    );
  }

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId,
      },
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId: session.user.id,
      lessonId,
      completed: true,
      completedAt: new Date(),
    },
  });

  return NextResponse.redirect(
    new URL(
      `/account/programs/${slug}/lessons/${lessonId}`,
      request.url,
    ),
  );
}