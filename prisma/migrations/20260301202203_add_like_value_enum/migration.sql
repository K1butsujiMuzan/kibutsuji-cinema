/*
  Warnings:

  - You are about to drop the column `is_liked` on the `comment_likes` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `comments` table. All the data in the column will be lost.
  - Added the required column `value` to the `comment_likes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LikeValue" AS ENUM ('LIKE', 'DISLIKE');

-- AlterTable
ALTER TABLE "comment_likes" DROP COLUMN "is_liked",
ADD COLUMN     "value" "LikeValue" NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "likes_count",
ADD COLUMN     "comment_rating" INTEGER NOT NULL DEFAULT 0;
