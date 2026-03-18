/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "subscriptionId";
