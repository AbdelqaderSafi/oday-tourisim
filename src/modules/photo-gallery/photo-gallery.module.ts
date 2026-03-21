import { Module } from '@nestjs/common';
import { PhotoGalleryService } from './photo-gallery.service';
import { PhotoGalleryController } from './photo-gallery.controller';
import { DatabaseService } from '../database/database.service';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [PhotoGalleryController],
  providers: [PhotoGalleryService, DatabaseService],
  imports: [FileModule],
})
export class PhotoGalleryModule {}
