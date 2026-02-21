/*
  Warnings:

  - The primary key for the `_AnimeToAnimeGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `anime_genres` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToAnimeGenre" DROP CONSTRAINT "_AnimeToAnimeGenre_B_fkey";

-- AlterTable
ALTER TABLE "_AnimeToAnimeGenre" DROP CONSTRAINT "_AnimeToAnimeGenre_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_AnimeToAnimeGenre_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "anime_genres" DROP CONSTRAINT "anime_genres_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "anime_genres_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "anime_genres_id_seq";

-- AddForeignKey
ALTER TABLE "_AnimeToAnimeGenre" ADD CONSTRAINT "_AnimeToAnimeGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "anime_genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
