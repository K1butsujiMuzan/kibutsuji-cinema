/*
  Warnings:

  - A unique constraint covering the columns `[id,rating]` on the table `anime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "anime_id_rating_key" ON "anime"("id", "rating");
