/*
  Warnings:

  - You are about to drop the column `url` on the `anime_episodes` table. All the data in the column will be lost.
  - Made the column `title` on table `anime_episodes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "anime_episodes_url_key";

-- AlterTable
ALTER TABLE "anime_episodes" DROP COLUMN "url",
ALTER COLUMN "title" SET NOT NULL;
