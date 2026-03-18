/*
  Warnings:

  - Made the column `end_date` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `subscription` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "end_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "subscription" "SubscriptionType" NOT NULL,
ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
