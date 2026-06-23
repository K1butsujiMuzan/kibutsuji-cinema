/*
  Warnings:

  - A unique constraint covering the columns `[rating,id]` on the table `anime` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "anime_id_rating_key";

-- CreateIndex
CREATE UNIQUE INDEX "anime_rating_id_key" ON "anime"("rating", "id");
