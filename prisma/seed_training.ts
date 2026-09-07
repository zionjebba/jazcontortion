import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const program = await prisma.program.findUnique({
    where: {
      slug: "flexibility-blueprint",
    },
  });

  if (!program) {
    throw new Error(
      "The Flexibility Blueprint program does not exist. Run the program seed first.",
    );
  }

  const module1 = await prisma.module.upsert({
    where: {
      programId_position: {
        programId: program.id,
        position: 1,
      },
    },
    update: {
      title: "Foundation",
      description:
        "Build the foundation for your flexibility training.",
    },
    create: {
      programId: program.id,
      title: "Foundation",
      description:
        "Build the foundation for your flexibility training.",
      position: 1,
    },
  });

  const lessons = [
    {
      title: "Welcome to the Program",
      position: 1,
    },
    {
      title: "Warm-Up",
      position: 2,
    },
    {
      title: "Foundation Flexibility",
      position: 3,
    },
    {
      title: "Active Stretching",
      position: 4,
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: {
        moduleId_position: {
          moduleId: module1.id,
          position: lesson.position,
        },
      },
      update: {
        title: lesson.title,
      },
      create: {
        moduleId: module1.id,
        title: lesson.title,
        position: lesson.position,
      },
    });
  }

  console.log("Training content seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });