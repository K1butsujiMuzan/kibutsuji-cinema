/*
  Warnings:

  - You are about to drop the column `ageLimit` on the `anime` table. All the data in the column will be lost.
  - Added the required column `age_limit` to the `anime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FriendListStatus" AS ENUM ('PENDING', 'BLOCKED', 'FRIEND');

-- DropIndex
DROP INDEX "anime_ageLimit_idx";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "ageLimit",
ADD COLUMN     "age_limit" "AgeLimit" NOT NULL;

-- CreateTable
CREATE TABLE "friend_lists" (
    "id" TEXT NOT NULL,
    "status" "FriendListStatus" NOT NULL DEFAULT 'PENDING',
    "user_from_id" TEXT NOT NULL,
    "user_to_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friend_lists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friend_lists_user_from_id_user_to_id_key" ON "friend_lists"("user_from_id", "user_to_id");

-- CreateIndex
CREATE INDEX "anime_age_limit_idx" ON "anime"("age_limit");

-- AddForeignKey
ALTER TABLE "friend_lists" ADD CONSTRAINT "friend_lists_user_from_id_fkey" FOREIGN KEY ("user_from_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_lists" ADD CONSTRAINT "friend_lists_user_to_id_fkey" FOREIGN KEY ("user_to_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
