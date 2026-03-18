/*
  Warnings:

  - The `access` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AnimeAccessType" AS ENUM ('FREE', 'PAID');

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "access",
ADD COLUMN     "access" "AnimeAccessType" NOT NULL DEFAULT 'FREE';
