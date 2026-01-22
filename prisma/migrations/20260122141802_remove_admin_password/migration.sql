/*
  Warnings:

  - You are about to drop the column `adminPassword` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "adminPassword";

-- CreateTable
CREATE TABLE "animes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT,
    "age_limit" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "release_year_id" INTEGER NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "release_years" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "release_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "anime_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeToTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnimeToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "animes_release_year_id_idx" ON "animes"("release_year_id");

-- CreateIndex
CREATE INDEX "animes_type_id_idx" ON "animes"("type_id");

-- CreateIndex
CREATE UNIQUE INDEX "release_years_year_key" ON "release_years"("year");

-- CreateIndex
CREATE UNIQUE INDEX "anime_types_name_key" ON "anime_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "_AnimeToTag_B_index" ON "_AnimeToTag"("B");

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "anime_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_release_year_id_fkey" FOREIGN KEY ("release_year_id") REFERENCES "release_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToTag" ADD CONSTRAINT "_AnimeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToTag" ADD CONSTRAINT "_AnimeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
