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
    `id` VARCHAR(36) NOT NULL,
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
    `id` VARCHAR(36) NOT NULL,
    `hotel_id` VARCHAR(36) NOT NULL,
    `trip_id` VARCHAR(36) NULL,
    `service_id` VARCHAR(36) NULL,
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
    `id` VARCHAR(191) NOT NULL,
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
    `id` VARCHAR(36) NOT NULL,
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
    `destination` ENUM('SHARM_EL_SHEIKH', 'EL_GHARDQA', 'EL_AIN_SOKHNA', 'DAHAB') NOT NULL,
    `initial_price` DECIMAL(10, 2) NOT NULL,
    `stars` ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE') NOT NULL,
    `rating` ENUM('UNRATED', 'MOST_BOOKED', 'TOP_RATED', 'LOWEST_PRICE') NOT NULL,
    `is_discounted` BOOLEAN NOT NULL DEFAULT false,
    `discount_percentage` DECIMAL(5, 2) NULL,
    `original_price` DECIMAL(10, 2) NULL,
    `youtube_video_url` TEXT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_translations` (
    `id` VARCHAR(36) NOT NULL,
    `hotel_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `Facilities` JSON NOT NULL,

    UNIQUE INDEX `hotel_translations_slug_key`(`slug`),
    UNIQUE INDEX `hotel_translations_hotel_id_language_key`(`hotel_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_addons` (
    `id` VARCHAR(36) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `hotel_id` VARCHAR(36) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_addon_translations` (
    `id` VARCHAR(36) NOT NULL,
    `addon_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `hotel_addon_translations_addon_id_language_key`(`addon_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_addons` (
    `id` VARCHAR(36) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `trip_id` VARCHAR(36) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_addon_translations` (
    `id` VARCHAR(36) NOT NULL,
    `addon_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `trip_addon_translations_addon_id_language_key`(`addon_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `id` VARCHAR(36) NOT NULL,
    `capacity` VARCHAR(50) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `hotel_id` VARCHAR(36) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_translations` (
    `id` VARCHAR(36) NOT NULL,
    `room_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `room_translations_room_id_language_key`(`room_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers` (
    `id` VARCHAR(36) NOT NULL,
    `destination` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `currency` ENUM('USD', 'EUR', 'EGP', 'ILS') NOT NULL,
    `duration` VARCHAR(255) NOT NULL,
    `services` JSON NOT NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` VARCHAR(191) NOT NULL,
    `company_name_ar` TEXT NULL,
    `company_name_en` TEXT NULL,
    `location` TEXT NULL,
    `whatsapp_number` VARCHAR(50) NULL,
    `phone_number` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
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
    `price` DECIMAL(10, 2) NOT NULL,
    `start_time` VARCHAR(255) NOT NULL,
    `end_time` VARCHAR(255) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_translations` (
    `id` VARCHAR(36) NOT NULL,
    `trip_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `duration` VARCHAR(255) NOT NULL,
    `facilities` JSON NOT NULL,

    UNIQUE INDEX `trip_translations_slug_key`(`slug`),
    UNIQUE INDEX `trip_translations_trip_id_language_key`(`trip_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_options` (
    `id` VARCHAR(36) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `trip_id` VARCHAR(36) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_option_translations` (
    `id` VARCHAR(36) NOT NULL,
    `option_id` VARCHAR(36) NOT NULL,
    `language` ENUM('ar', 'en') NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `trip_option_translations_option_id_language_key`(`option_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assets` (
    `id` VARCHAR(36) NOT NULL,
    `storage_provider_name` ENUM('IMAGE_KIT') NOT NULL DEFAULT 'IMAGE_KIT',
    `file_id` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `file_type` TEXT NOT NULL,
    `file_size_in_kb` INTEGER UNSIGNED NOT NULL,
    `kind` ENUM('HOTEL_MAIN_IMAGE', 'HOTEL_GALLERY_IMAGE', 'TRIP_MAIN_IMAGE', 'TRIP_GALLERY_IMAGE', 'OFFER_IMAGE', 'GALLERY_IMAGE') NOT NULL,
    `hotel_id` VARCHAR(36) NULL,
    `trip_id` VARCHAR(36) NULL,
    `offer_id` VARCHAR(36) NULL,
    `gallery_id` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `assets_file_id_key`(`file_id`),
    INDEX `assets_trip_id_idx`(`trip_id`),
    INDEX `assets_hotel_id_idx`(`hotel_id`),
    INDEX `assets_gallery_id_idx`(`gallery_id`),
    INDEX `assets_offer_id_idx`(`offer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hotel_translations` ADD CONSTRAINT `hotel_translations_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hotel_addons` ADD CONSTRAINT `hotel_addons_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hotel_addon_translations` ADD CONSTRAINT `hotel_addon_translations_addon_id_fkey` FOREIGN KEY (`addon_id`) REFERENCES `hotel_addons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_addons` ADD CONSTRAINT `trip_addons_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_addon_translations` ADD CONSTRAINT `trip_addon_translations_addon_id_fkey` FOREIGN KEY (`addon_id`) REFERENCES `trip_addons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_translations` ADD CONSTRAINT `room_translations_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_translations` ADD CONSTRAINT `trip_translations_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_options` ADD CONSTRAINT `trip_options_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_option_translations` ADD CONSTRAINT `trip_option_translations_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `trip_options`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_offer_id_fkey` FOREIGN KEY (`offer_id`) REFERENCES `offers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_gallery_id_fkey` FOREIGN KEY (`gallery_id`) REFERENCES `gallery`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
