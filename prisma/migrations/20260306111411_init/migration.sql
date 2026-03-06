-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` TEXT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `type` ENUM('FLYING', 'TRANSPORTATION', 'INSURANCE', 'OTHER') NOT NULL,
    `description` TEXT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checkout` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `hotel_id` VARCHAR(36) NOT NULL,
    `trip_id` VARCHAR(36) NULL,
    `service_id` BIGINT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `individual_number` INTEGER NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,

    INDEX `checkout_hotel_id_fkey`(`hotel_id`),
    INDEX `checkout_service_id_fkey`(`service_id`),
    INDEX `checkout_trip_id_fkey`(`trip_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `client_name` VARCHAR(255) NOT NULL,
    `stars` ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE') NOT NULL,
    `comment` TEXT NOT NULL,
    `trip_name` VARCHAR(255) NULL,
    `is_hidden` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gallery` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `image` TEXT NOT NULL,
    `image_title` TEXT NOT NULL,
    `description` TEXT NULL,
    `type` ENUM('COMPANY', 'CLIENT') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotels` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `stars` ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE') NOT NULL,
    `hotel_images` TEXT NULL,
    `features` JSON NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `city` VARCHAR(255) NOT NULL,
    `price_per_night` DECIMAL(10, 2) NOT NULL,
    `duration` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers` (
    `id` VARCHAR(36) NOT NULL,
    `destination` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `currency` ENUM('USD', 'EUR', 'EGP', 'ILS') NOT NULL,
    `duration` VARCHAR(255) NOT NULL,
    `offer_image` TEXT NOT NULL,
    `services` JSON NOT NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `company_name_ar` TEXT NULL,
    `company_name_en` TEXT NULL,
    `location` TEXT NULL,
    `whatsapp_number` VARCHAR(50) NULL,
    `phone_number` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `new_column` BIGINT NULL,
    `facebook_link` TEXT NULL,
    `instagram_link` TEXT NULL,
    `tiktok_link` TEXT NULL,
    `hero_title` TEXT NULL,
    `hero_subtitle` TEXT NULL,
    `badge` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trips` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `duration` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `currency` ENUM('USD', 'EUR', 'EGP', 'ILS') NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `trip_images` TEXT NOT NULL,
    `notes` TEXT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
