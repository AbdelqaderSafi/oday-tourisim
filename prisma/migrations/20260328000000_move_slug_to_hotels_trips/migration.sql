-- Add slug column to hotels table
ALTER TABLE `hotels` ADD COLUMN `slug` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE `hotels` ADD UNIQUE INDEX `hotels_slug_key`(`slug`);

-- Add slug column to trips table
ALTER TABLE `trips` ADD COLUMN `slug` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE `trips` ADD UNIQUE INDEX `trips_slug_key`(`slug`);

-- Drop slug column from hotel_translations table
ALTER TABLE `hotel_translations` DROP INDEX `hotel_translations_slug_key`;
ALTER TABLE `hotel_translations` DROP COLUMN `slug`;

-- Drop slug column from trip_translations table
ALTER TABLE `trip_translations` DROP INDEX `trip_translations_slug_key`;
ALTER TABLE `trip_translations` DROP COLUMN `slug`;
