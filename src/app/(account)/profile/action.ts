"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const name = String(formData.get("name") ?? "").trim();

  if (name.length > 100) {
    return {
      error: "Name must be 100 characters or fewer.",
    };
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: name || null,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/account");

  return {
    success: true,
  };
}