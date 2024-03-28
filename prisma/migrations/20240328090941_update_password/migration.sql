/*
  Warnings:

  - You are about to drop the column `createdAt` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `latlong` on the `dorms` table. All the data in the column will be lost.
  - Added the required column `dorm_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dorm_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dorms` DROP COLUMN `latlong`,
    ADD COLUMN `is_verify` ENUM('PEDNING', 'VERIFY', 'BANDED') NOT NULL DEFAULT 'PEDNING',
    ADD COLUMN `lat_long` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_dorm_id_fkey` FOREIGN KEY (`dorm_id`) REFERENCES `dorms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
