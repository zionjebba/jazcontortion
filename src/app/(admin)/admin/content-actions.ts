"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { revalidatePath } from "next/cache";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function createModule(programId: string, data: { title: string; description?: string }) {
  await requireAdmin();

  const count = await prisma.module.count({ where: { programId } });
  
  await prisma.module.create({
    data: {
      programId,
      title: data.title,
      description: data.description,
      position: count,
    }
  });

  revalidatePath(`/admin/programs/${programId}/content`);
}

export async function updateModule(moduleId: string, data: { title: string; description?: string }) {
  await requireAdmin();
  
  const mod = await prisma.module.update({
    where: { id: moduleId },
    data,
  });

  revalidatePath(`/admin/programs/${mod.programId}/content`);
}

export async function deleteModule(moduleId: string) {
  await requireAdmin();

  // Find all lessons in this module that have a muxAssetId
  const lessons = await prisma.lesson.findMany({
    where: { moduleId, muxAssetId: { not: null } },
    select: { muxAssetId: true },
  });

  // Delete them from Mux
  for (const lesson of lessons) {
    if (lesson.muxAssetId) {
      try {
        await mux.video.assets.delete(lesson.muxAssetId);
      } catch (error) {
        console.error(`Failed to delete Mux asset ${lesson.muxAssetId}:`, error);
      }
    }
  }

  const mod = await prisma.module.delete({ where: { id: moduleId }});
  
  revalidatePath(`/admin/programs/${mod.programId}/content`);
}

export async function createLesson(moduleId: string, programId: string, data: { title: string; description?: string; videoUrl?: string; content?: string; muxUploadId?: string }) {
  await requireAdmin();

  const count = await prisma.lesson.count({ where: { moduleId } });
  
  await prisma.lesson.create({
    data: {
      moduleId,
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      content: data.content,
      muxUploadId: data.muxUploadId,
      muxStatus: data.muxUploadId ? "uploading" : null,
      position: count,
    }
  });

  revalidatePath(`/admin/programs/${programId}/content`);
}

export async function updateLesson(lessonId: string, programId: string, data: { title: string; description?: string; videoUrl?: string; content?: string; muxUploadId?: string }) {
  await requireAdmin();
  
  await prisma.lesson.update({
    where: { id: lessonId },
    data,
  });

  revalidatePath(`/admin/programs/${programId}/content`);
}

export async function deleteLesson(lessonId: string, programId: string) {
  await requireAdmin();

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { muxAssetId: true }
  });

  if (lesson?.muxAssetId) {
    try {
      await mux.video.assets.delete(lesson.muxAssetId);
    } catch (error) {
      console.error(`Failed to delete Mux asset ${lesson.muxAssetId}:`, error);
    }
  }

  await prisma.lesson.delete({ where: { id: lessonId }});
  
  revalidatePath(`/admin/programs/${programId}/content`);
}
