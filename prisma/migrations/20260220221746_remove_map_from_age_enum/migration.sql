/*
  Warnings:

  - The values [6+,12+,16+,18+] on the enum `AgeLimit` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AgeLimit_new" AS ENUM ('AGE_6', 'AGE_12', 'AGE_16', 'AGE_18');
ALTER TABLE "anime" ALTER COLUMN "ageLimit" TYPE "AgeLimit_new" USING ("ageLimit"::text::"AgeLimit_new");
ALTER TYPE "AgeLimit" RENAME TO "AgeLimit_old";
ALTER TYPE "AgeLimit_new" RENAME TO "AgeLimit";
DROP TYPE "public"."AgeLimit_old";
COMMIT;

-- AlterTable
ALTER TABLE "anime_episodes" ALTER COLUMN "episode_number" SET DEFAULT 1;
