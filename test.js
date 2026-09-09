import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = "postgresql://neondb_owner:npg_S5TsjFae4ynD@ep-flat-cell-aywky08g-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"; // dummy
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
