import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { readFile } from "fs/promises";
import path from "path";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const resources = {
  blueprint: {
    file: "blueprint.pdf",
    name: "flexibility-blueprint.pdf",
    programSlug: "flexibility-blueprint",
  },
  calendar: {
    file: "training-calendar.pdf",
    name: "training-calendar.pdf",
    programSlug: "flexibility-blueprint",
  },
  tracker: {
    file: "progress-tracker.pdf",
    name: "progress-tracker.pdf",
    programSlug: "flexibility-blueprint",
  },
  stickers: {
    file: "digital-stickers.zip",
    name: "digital-stickers.zip",
    programSlug: "flexibility-blueprint",
  },
} as const;

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be logged in." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource") as keyof typeof resources;

  if (!resource || !resources[resource]) {
    return NextResponse.json(
      { error: "Resource not found." },
      { status: 404 },
    );
  }

  const selectedResource = resources[resource];

  if (session.user.role !== "ADMIN") {
    const entitlement = await prisma.entitlement.findFirst({
      where: {
        userId: session.user.id,
        program: {
          slug: selectedResource.programSlug,
        },
      },
    });

    if (!entitlement) {
      return NextResponse.json(
        { error: "You do not have access to this resource." },
        { status: 403 },
      );
    }
  }


  const filePath = path.join(
    process.cwd(),
    "private",
    "resources",
    selectedResource.file,
  );

  try {
    const file = await readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${selectedResource.name}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Resource file not found." },
      { status: 404 },
    );
  }
}