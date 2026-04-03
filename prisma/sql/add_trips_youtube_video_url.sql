-- Safe additive change for existing DBs (works on older MySQL too).
SET @has_col := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'trips'
    AND COLUMN_NAME = 'youtube_video_url'
);

SET @stmt := IF(
  @has_col = 0,
  'ALTER TABLE `trips` ADD COLUMN `youtube_video_url` TEXT NULL',
  'SELECT 1'
);

PREPARE s FROM @stmt;
EXECUTE s;
DEALLOCATE PREPARE s;

