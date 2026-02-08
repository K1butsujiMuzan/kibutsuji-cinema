/*
  Warnings:

  - You are about to drop the column `age_limit_id` on the `anime` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `anime` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `anime` table. All the data in the column will be lost.
  - You are about to drop the `anime_age_limits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `anime_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `anime_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `age_limit` to the `anime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimeStatus" AS ENUM ('ONGOING', 'COMPLETED', 'ANNOUNCEMENT');

-- CreateEnum
CREATE TYPE "AnimeType" AS ENUM ('TVSERIES', 'MOVIE', 'SHORTFILM', 'SPECIAL', 'OVA', 'ONA', 'CLIP');

-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_age_limit_id_fkey";

-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_status_id_fkey";

-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_type_id_fkey";

-- DropIndex
DROP INDEX "anime_age_limit_id_idx";

-- DropIndex
DROP INDEX "anime_status_id_idx";

-- DropIndex
DROP INDEX "anime_type_id_idx";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "age_limit_id",
DROP COLUMN "status_id",
DROP COLUMN "type_id",
ADD COLUMN     "age_limit" INTEGER NOT NULL,
ADD COLUMN     "status" "AnimeStatus" NOT NULL DEFAULT 'ANNOUNCEMENT',
ADD COLUMN     "type" "AnimeType" NOT NULL DEFAULT 'TVSERIES';

-- DropTable
DROP TABLE "anime_age_limits";

-- DropTable
DROP TABLE "anime_statuses";

-- DropTable
DROP TABLE "anime_types";

-- CreateIndex
CREATE INDEX "anime_age_limit_idx" ON "anime"("age_limit");

-- CreateIndex
CREATE INDEX "anime_status_idx" ON "anime"("status");

-- CreateIndex
CREATE INDEX "anime_type_idx" ON "anime"("type");
