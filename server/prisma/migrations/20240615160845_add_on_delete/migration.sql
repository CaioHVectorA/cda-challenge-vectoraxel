-- DropForeignKey
ALTER TABLE `badgesofuser` DROP FOREIGN KEY `BadgesOfUser_badgeId_fkey`;

-- DropForeignKey
ALTER TABLE `badgesofuser` DROP FOREIGN KEY `BadgesOfUser_userId_fkey`;

-- AddForeignKey
ALTER TABLE `BadgesOfUser` ADD CONSTRAINT `BadgesOfUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BadgesOfUser` ADD CONSTRAINT `BadgesOfUser_badgeId_fkey` FOREIGN KEY (`badgeId`) REFERENCES `badges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
