/*
  Warnings:

  - You are about to drop the column `age_limit` on the `anime` table. All the data in the column will be lost.
  - Added the required column `ageLimit` to the `anime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AgeLimit" AS ENUM ('6+', '12+', '16+', '18+');

-- DropIndex
DROP INDEX "anime_age_limit_idx";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "age_limit",
ADD COLUMN     "ageLimit" "AgeLimit" NOT NULL;

-- CreateIndex
CREATE INDEX "anime_ageLimit_idx" ON "anime"("ageLimit");
