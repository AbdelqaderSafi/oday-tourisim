-- AlterTable: simplify offers (drop old columns)
ALTER TABLE `offers`
  DROP COLUMN `destination`,
  DROP COLUMN `price`,
  DROP COLUMN `currency`,
  DROP COLUMN `duration`,
  DROP COLUMN `services`,
  DROP COLUMN `is_featured`;

-- CreateTable: photo_gallery
CREATE TABLE `photo_gallery` (
    `id` VARCHAR(36) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable: add photo_gallery_id to assets
ALTER TABLE `assets` ADD COLUMN `photo_gallery_id` VARCHAR(36) NULL;

-- CreateIndex
CREATE INDEX `assets_photo_gallery_id_idx` ON `assets`(`photo_gallery_id`);

-- AlterEnum: add PHOTO_GALLERY_IMAGE to AssetKind
ALTER TABLE `assets` MODIFY COLUMN `kind` ENUM('HOTEL_MAIN_IMAGE', 'HOTEL_GALLERY_IMAGE', 'TRIP_MAIN_IMAGE', 'TRIP_GALLERY_IMAGE', 'OFFER_IMAGE', 'GALLERY_IMAGE', 'PHOTO_GALLERY_IMAGE') NOT NULL;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_photo_gallery_id_fkey` FOREIGN KEY (`photo_gallery_id`) REFERENCES `photo_gallery`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
