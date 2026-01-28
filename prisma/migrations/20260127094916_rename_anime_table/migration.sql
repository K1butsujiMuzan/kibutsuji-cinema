/*
  Warnings:

  - You are about to drop the `animes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToAnimeGenre" DROP CONSTRAINT "_AnimeToAnimeGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "anime_episodes" DROP CONSTRAINT "anime_episodes_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "animes" DROP CONSTRAINT "animes_age_limit_id_fkey";

-- DropForeignKey
ALTER TABLE "animes" DROP CONSTRAINT "animes_status_id_fkey";

-- DropForeignKey
ALTER TABLE "animes" DROP CONSTRAINT "animes_type_id_fkey";

-- DropTable
DROP TABLE "animes";

-- CreateTable
CREATE TABLE "anime" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "original_title" TEXT,
    "description" TEXT NOT NULL,
    "age_limit_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "release_year" INTEGER NOT NULL,
    "episodes_released" INTEGER NOT NULL,
    "episodes_count" INTEGER NOT NULL,
    "episodes_length" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anime_slug_key" ON "anime"("slug");

-- CreateIndex
CREATE INDEX "anime_title_idx" ON "anime"("title");

-- CreateIndex
CREATE INDEX "anime_release_year_idx" ON "anime"("release_year");

-- CreateIndex
CREATE INDEX "anime_age_limit_id_idx" ON "anime"("age_limit_id");

-- CreateIndex
CREATE INDEX "anime_status_id_idx" ON "anime"("status_id");

-- CreateIndex
CREATE INDEX "anime_type_id_idx" ON "anime"("type_id");

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_age_limit_id_fkey" FOREIGN KEY ("age_limit_id") REFERENCES "anime_age_limits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "anime_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "anime_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_episodes" ADD CONSTRAINT "anime_episodes_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAnimeGenre" ADD CONSTRAINT "_AnimeToAnimeGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
