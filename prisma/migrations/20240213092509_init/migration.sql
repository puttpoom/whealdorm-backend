/*
  Warnings:

  - You are about to alter the column `isAir` on the `room_facilities` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `DormFacilities` ADD COLUMN `is_ccty` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_internet` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_keycard` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_lift` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_lundary` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_mart` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_parking` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_water_dispenser` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `room_facilities` MODIFY `isAir` ENUM('FAN', 'AIRCONDITION') NOT NULL DEFAULT 'FAN';
