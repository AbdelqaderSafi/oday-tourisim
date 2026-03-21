-- AlterTable: drop direct name/description columns from security_service_types
ALTER TABLE `security_service_types` DROP COLUMN `name`, DROP COLUMN `description`;

-- AlterTable: drop direct name column from flight_types
ALTER TABLE `flight_types` DROP COLUMN `name`;

-- CreateTable: security_service_type_translations
CREATE TABLE `security_service_type_translations` (
    `id` VARCHAR(36) NOT NULL,
    `service_type_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `security_service_type_translations_service_type_id_language_key`(`service_type_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable: flight_type_translations
CREATE TABLE `flight_type_translations` (
    `id` VARCHAR(36) NOT NULL,
    `flight_type_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `flight_type_translations_flight_type_id_language_key`(`flight_type_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `security_service_type_translations` ADD CONSTRAINT `security_service_type_translations_service_type_id_fkey` FOREIGN KEY (`service_type_id`) REFERENCES `security_service_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flight_type_translations` ADD CONSTRAINT `flight_type_translations_flight_type_id_fkey` FOREIGN KEY (`flight_type_id`) REFERENCES `flight_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
