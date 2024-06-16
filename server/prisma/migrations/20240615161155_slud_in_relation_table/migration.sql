/*
  Warnings:

  - Added the required column `badgeSlug` to the `BadgesOfUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `badgesofuser` ADD COLUMN `badgeSlug` VARCHAR(191) NOT NULL;
