-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "goals" TEXT[],
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "includes" TEXT[],
ADD COLUMN     "level" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT '';
