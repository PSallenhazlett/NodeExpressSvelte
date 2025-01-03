-- DropIndex
DROP INDEX `Car_createdById_fkey` ON `car`;

-- AlterTable
ALTER TABLE `car` MODIFY `createdById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
