/*
  Warnings:

  - You are about to drop the column `rating` on the `anime` table. All the data in the column will be lost.
  - You are about to drop the column `rating_count` on the `anime` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `comments` table. All the data in the column will be lost.
  - Added the required column `is_liked` to the `comment_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anime" DROP COLUMN "rating",
DROP COLUMN "rating_count";

-- AlterTable
ALTER TABLE "anime_episodes" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "anime_ratings" ALTER COLUMN "rating" SET DEFAULT 0.0,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "comment_likes" ADD COLUMN     "is_liked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "likes_count";

-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
