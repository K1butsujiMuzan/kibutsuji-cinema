/*
  Warnings:

  - Added the required column `adminPassword` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "adminPassword" TEXT NOT NULL;
