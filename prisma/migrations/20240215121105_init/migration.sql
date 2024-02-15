/*
  Warnings:

  - The values [UNKNOW] on the enum `appointments_appointment_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `DormFacilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `full_name` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `DormFacilities` DROP FOREIGN KEY `DormFacilities_dorm_id_fkey`;

-- DropForeignKey
ALTER TABLE `Room` DROP FOREIGN KEY `Room_dorm_id_fkey`;

-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_facilities` DROP FOREIGN KEY `room_facilities_room_id_fkey`;

-- AlterTable
ALTER TABLE `appointments` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `full_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `appointment_status` ENUM('PEDNING', 'CONFIRM', 'CANCLED', 'DONE') NOT NULL DEFAULT 'PEDNING';

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN', 'DORM', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `DormFacilities`;

-- DropTable
DROP TABLE `Room`;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dorm_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `info` VARCHAR(191) NULL,
    `room_images` VARCHAR(191) NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `size` VARCHAR(191) NULL,
    `room_status` ENUM('VACANT', 'RENTED') NOT NULL DEFAULT 'VACANT',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dorm_facilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_parking` BOOLEAN NOT NULL DEFAULT false,
    `is_keycard` BOOLEAN NOT NULL DEFAULT false,
    `is_lift` BOOLEAN NOT NULL DEFAULT false,
    `is_internet` BOOLEAN NOT NULL DEFAULT false,
    `is_ccty` BOOLEAN NOT NULL DEFAULT false,
    `is_lundary` BOOLEAN NOT NULL DEFAULT false,
    `is_water_dispenser` BOOLEAN NOT NULL DEFAULT false,
    `is_mart` BOOLEAN NOT NULL DEFAULT false,
    `dorm_id` INTEGER NOT NULL,

    UNIQUE INDEX `dorm_facilities_dorm_id_key`(`dorm_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_dorm_id_fkey` FOREIGN KEY (`dorm_id`) REFERENCES `dorms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_facilities` ADD CONSTRAINT `room_facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dorm_facilities` ADD CONSTRAINT `dorm_facilities_dorm_id_fkey` FOREIGN KEY (`dorm_id`) REFERENCES `dorms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
