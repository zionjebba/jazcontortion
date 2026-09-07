import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = "postgres://postgres:postgres@localhost:5432/postgres"; // dummy
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const slug = "test";
    await prisma.program.findUnique({
      where: { slug },
      select: { id: true, slug: true, title: true, price: true, isPublished: true },
    });
    console.log("Success");
  } catch (e) {
    console.error(e.message);
  }
}
main();
