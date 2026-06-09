/*
  Warnings:

  - You are about to drop the column `author_id` on the `anime` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `authors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[english_name]` on the table `authors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_author_id_fkey";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "author_id",
ADD COLUMN     "author_name" TEXT;

-- AlterTable
ALTER TABLE "authors" DROP COLUMN "name",
ADD COLUMN     "originalName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "authors_english_name_key" ON "authors"("english_name");

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_author_name_fkey" FOREIGN KEY ("author_name") REFERENCES "authors"("english_name") ON DELETE SET NULL ON UPDATE CASCADE;
