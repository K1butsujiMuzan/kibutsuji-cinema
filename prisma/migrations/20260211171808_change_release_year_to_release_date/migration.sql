/*
  Warnings:

  - You are about to drop the column `release_year` on the `anime` table. All the data in the column will be lost.
  - Added the required column `release_date` to the `anime` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "anime_release_year_idx";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "release_year",
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "anime_release_date_idx" ON "anime"("release_date");
