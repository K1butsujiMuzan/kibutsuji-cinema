/*
  Warnings:

  - You are about to drop the column `author_name` on the `anime` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `authors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `authors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_author_name_fkey";

-- DropIndex
DROP INDEX "authors_english_name_key";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "author_name",
ADD COLUMN     "author_id" TEXT;

-- AlterTable
ALTER TABLE "authors" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "authors_slug_key" ON "authors"("slug");

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
