/*
  Warnings:

  - You are about to drop the column `author_id` on the `anime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_author_id_fkey";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "author_id",
ADD COLUMN     "author_slug" TEXT;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_author_slug_fkey" FOREIGN KEY ("author_slug") REFERENCES "authors"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
