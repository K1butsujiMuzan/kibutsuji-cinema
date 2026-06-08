/*
  Warnings:

  - The values [TVSERIES,SHORTFILM] on the enum `AnimeType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MEGAFAN] on the enum `SubscriptionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnimeType_new" AS ENUM ('TV_SERIES', 'MOVIE', 'SHORT_FILM', 'SPECIAL', 'OVA', 'ONA', 'CLIP');
ALTER TABLE "public"."anime" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "anime" ALTER COLUMN "type" TYPE "AnimeType_new" USING ("type"::text::"AnimeType_new");
ALTER TYPE "AnimeType" RENAME TO "AnimeType_old";
ALTER TYPE "AnimeType_new" RENAME TO "AnimeType";
DROP TYPE "public"."AnimeType_old";
ALTER TABLE "anime" ALTER COLUMN "type" SET DEFAULT 'TV_SERIES';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionType_new" AS ENUM ('FAN', 'MEGA_FAN');
ALTER TABLE "subscriptions" ALTER COLUMN "type" TYPE "SubscriptionType_new" USING ("type"::text::"SubscriptionType_new");
ALTER TABLE "transactions" ALTER COLUMN "subscription" TYPE "SubscriptionType_new" USING ("subscription"::text::"SubscriptionType_new");
ALTER TYPE "SubscriptionType" RENAME TO "SubscriptionType_old";
ALTER TYPE "SubscriptionType_new" RENAME TO "SubscriptionType";
DROP TYPE "public"."SubscriptionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "anime" ALTER COLUMN "type" SET DEFAULT 'TV_SERIES';
