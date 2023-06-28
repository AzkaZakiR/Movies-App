/*
  Warnings:

  - Added the required column `duration` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` ADD COLUMN `director` VARCHAR(191) NULL,
    ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `genre` VARCHAR(191) NULL,
    ADD COLUMN `subtitle` VARCHAR(191) NULL;
