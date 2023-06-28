/*
  Warnings:

  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `movieId` on the `showtimes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `movieId` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `movie_format` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `showtimes` DROP FOREIGN KEY `Showtimes_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_movieId_fkey`;

-- AlterTable
ALTER TABLE `movies` DROP PRIMARY KEY,
    ADD COLUMN `movie_format` VARCHAR(191) NOT NULL,
    ADD COLUMN `release_date` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `showtimes` MODIFY `movieId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `movieId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Showtimes` ADD CONSTRAINT `Showtimes_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
