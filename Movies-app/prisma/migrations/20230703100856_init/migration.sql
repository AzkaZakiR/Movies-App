/*
  Warnings:

  - You are about to drop the column `movieId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_movieId_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `movieId`;
