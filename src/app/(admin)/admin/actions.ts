"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { revalidatePath } from "next/cache";

export async function createProgram(data: {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  level: string;
  type: string;
  image: string;
  includes: string[];
  goals: string[];
  isPublished: boolean;
}) {
  await requireAdmin();

  const program = await prisma.program.create({
    data,
  });

  revalidatePath("/admin/programs");
  revalidatePath("/programs");
  return { success: true, program };
}

export async function updateProgram(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    tagline: string;
    description: string;
    price: number;
    level: string;
    type: string;
    image: string;
    includes: string[];
    goals: string[];
    isPublished: boolean;
  }>
) {
  await requireAdmin();

  const program = await prisma.program.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/programs");
  revalidatePath(`/admin/programs/${id}`);
  revalidatePath(`/programs/${program.slug}`);
  revalidatePath("/programs");
  return { success: true, program };
}

export async function deleteProgram(id: string) {
  await requireAdmin();

  await prisma.program.delete({
    where: { id },
  });

  revalidatePath("/admin/programs");
  revalidatePath("/programs");
  return { success: true };
}

export async function toggleUserRole(userId: string, newRole: "ADMIN" | "USER") {
  await requireAdmin();

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/admin/users");
  return { success: true, role: user.role };
}
