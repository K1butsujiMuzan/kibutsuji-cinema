/*
  Warnings:

  - You are about to drop the column `createdAt` on the `anime_ratings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `anime_ratings` table. All the data in the column will be lost.
  - You are about to drop the column `added_at` on the `lists` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `anime_episodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `anime_genres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `anime_ratings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `comment_likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anime" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "anime_episodes" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "anime_genres" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "anime_ratings" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "comment_likes" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "lists" DROP COLUMN "added_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
