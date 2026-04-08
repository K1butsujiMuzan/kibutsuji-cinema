/*
  Warnings:

  - You are about to drop the column `backgroundImage` on the `anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "anime" DROP COLUMN "backgroundImage",
ADD COLUMN     "background_image" TEXT;
