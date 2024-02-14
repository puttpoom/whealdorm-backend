-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `role` ENUM('ADMIN', 'DORM', 'USER') NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appointed_date` VARCHAR(191) NOT NULL,
    `appointed_time` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `appointment_status` ENUM('PEDNING', 'CONFIRM', 'CANCLED', 'UNKNOW') NOT NULL DEFAULT 'PEDNING',
    `room_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dorms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `dorm_images` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `distance` VARCHAR(191) NOT NULL,
    `electrical_unit` DECIMAL(2, 2) NOT NULL,
    `water_unit` DECIMAL(2, 2) NOT NULL,
    `totalAvialableRoom` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dorm_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `info` VARCHAR(191) NULL,
    `room_images` VARCHAR(191) NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `size` VARCHAR(191) NULL,
    `room_status` ENUM('AVIALABLE', 'RENTED') NOT NULL DEFAULT 'AVIALABLE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_facilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `isAir` BOOLEAN NOT NULL DEFAULT false,
    `isWaterHeater` BOOLEAN NOT NULL DEFAULT false,
    `isFurniture` BOOLEAN NOT NULL DEFAULT false,
    `isTable` BOOLEAN NOT NULL DEFAULT false,
    `isSink` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `room_facilities_room_id_key`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DormFacilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dorm_id` INTEGER NOT NULL,

    UNIQUE INDEX `DormFacilities_dorm_id_key`(`dorm_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dorms` ADD CONSTRAINT `dorms_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_dorm_id_fkey` FOREIGN KEY (`dorm_id`) REFERENCES `dorms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_facilities` ADD CONSTRAINT `room_facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DormFacilities` ADD CONSTRAINT `DormFacilities_dorm_id_fkey` FOREIGN KEY (`dorm_id`) REFERENCES `dorms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
