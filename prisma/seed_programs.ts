import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { programs } from "../src/data/programs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  for (const program of programs) {
    await prisma.program.upsert({
      where: {
        slug: program.slug,
      },
      update: {
        title: program.title,
        tagline: program.tagline,
        description: program.description,
        price: program.price,
        image: program.image,
        level: program.level,
        includes: program.includes,
        goals: program.goals,
        type: program.type,
      },
      create: {
        title: program.title,
        slug: program.slug,
        tagline: program.tagline,
        description: program.description,
        price: program.price,
        image: program.image,
        level: program.level,
        includes: program.includes,
        goals: program.goals,
        type: program.type,
        isPublished: true,
      },
    });
  }

  console.log(`Seeded ${programs.length} programs.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });