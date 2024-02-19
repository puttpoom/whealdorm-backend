/*
  Warnings:

  - You are about to drop the column `totalAvialableRoom` on the `dorms` table. All the data in the column will be lost.
  - You are about to alter the column `electrical_unit` on the `dorms` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `Decimal(4,2)`.
  - You are about to alter the column `water_unit` on the `dorms` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `Decimal(4,2)`.
  - You are about to drop the column `isAir` on the `room_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `isFurniture` on the `room_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `isSink` on the `room_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `isTable` on the `room_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `isWaterHeater` on the `room_facilities` table. All the data in the column will be lost.
  - You are about to alter the column `size` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[user_id]` on the table `dorms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dorm_name` to the `dorms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dorms` DROP COLUMN `totalAvialableRoom`,
    ADD COLUMN `dorm_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `latlong` VARCHAR(191) NULL,
    ADD COLUMN `total_vacant_room` INTEGER NOT NULL DEFAULT 0,
    MODIFY `dorm_images` VARCHAR(191) NULL,
    MODIFY `electrical_unit` DECIMAL(4, 2) NOT NULL,
    MODIFY `water_unit` DECIMAL(4, 2) NOT NULL;

-- AlterTable
ALTER TABLE `room_facilities` DROP COLUMN `isAir`,
    DROP COLUMN `isFurniture`,
    DROP COLUMN `isSink`,
    DROP COLUMN `isTable`,
    DROP COLUMN `isWaterHeater`,
    ADD COLUMN `is_air` ENUM('FAN', 'AIRCONDITION') NOT NULL DEFAULT 'FAN',
    ADD COLUMN `is_furniture` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_sink` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_table` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_waterheater` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `room_images` VARCHAR(10000) NULL,
    MODIFY `size` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `role` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `dorms_user_id_key` ON `dorms`(`user_id`);
