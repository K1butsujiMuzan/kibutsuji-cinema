/*
  Warnings:

  - You are about to drop the column `age_limit` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `release_year_id` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the `_AnimeToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `release_years` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `animes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age_limit_id` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodes_count` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodes_length` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodes_released` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_year` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `animes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToTag" DROP CONSTRAINT "_AnimeToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToTag" DROP CONSTRAINT "_AnimeToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "animes" DROP CONSTRAINT "animes_release_year_id_fkey";

-- DropIndex
DROP INDEX "animes_release_year_id_idx";

-- AlterTable
ALTER TABLE "animes" DROP COLUMN "age_limit",
DROP COLUMN "release_year_id",
ADD COLUMN     "age_limit_id" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "episodes_count" INTEGER NOT NULL,
ADD COLUMN     "episodes_length" INTEGER NOT NULL,
ADD COLUMN     "episodes_released" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "release_year" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status_id" INTEGER NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_AnimeToTag";

-- DropTable
DROP TABLE "release_years";

-- DropTable
DROP TABLE "tags";

-- CreateTable
CREATE TABLE "anime_episodes" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "anime_id" TEXT NOT NULL,

    CONSTRAINT "anime_episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_age_limits" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "anime_age_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_statuses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "anime_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "anime_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeToAnimeGenre" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnimeToAnimeGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "anime_episodes_url_key" ON "anime_episodes"("url");

-- CreateIndex
CREATE UNIQUE INDEX "anime_episodes_anime_id_episode_number_key" ON "anime_episodes"("anime_id", "episode_number");

-- CreateIndex
CREATE UNIQUE INDEX "anime_age_limits_age_key" ON "anime_age_limits"("age");

-- CreateIndex
CREATE UNIQUE INDEX "anime_statuses_name_key" ON "anime_statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "anime_genres_name_key" ON "anime_genres"("name");

-- CreateIndex
CREATE INDEX "_AnimeToAnimeGenre_B_index" ON "_AnimeToAnimeGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "animes_slug_key" ON "animes"("slug");

-- CreateIndex
CREATE INDEX "animes_title_idx" ON "animes"("title");

-- CreateIndex
CREATE INDEX "animes_release_year_idx" ON "animes"("release_year");

-- CreateIndex
CREATE INDEX "animes_age_limit_id_idx" ON "animes"("age_limit_id");

-- CreateIndex
CREATE INDEX "animes_status_id_idx" ON "animes"("status_id");

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_age_limit_id_fkey" FOREIGN KEY ("age_limit_id") REFERENCES "anime_age_limits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "anime_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_episodes" ADD CONSTRAINT "anime_episodes_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAnimeGenre" ADD CONSTRAINT "_AnimeToAnimeGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAnimeGenre" ADD CONSTRAINT "_AnimeToAnimeGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "anime_genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
