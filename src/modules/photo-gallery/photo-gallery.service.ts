import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FileService } from '../file/file.service';
import { DatabaseService } from '../database/database.service';
import { randomUUID } from 'crypto';

@Injectable()
export class PhotoGalleryService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly fileService: FileService,
  ) {}

  async create(files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException(
        'يجب إرفاق صورة واحدة على الأقل لمعرض الصور',
      );
    }

    const galleryId = randomUUID();

    return this.prisma.$transaction(async (tx) => {
      await tx.photoGallery.create({ data: { id: galleryId } });

      const now = new Date();
      for (const file of files) {
        await tx.$executeRaw`
          INSERT INTO assets
            (id, storage_provider_name, file_id, url, file_type, file_size_in_kb, kind, photo_gallery_id, created_at, updated_at)
          VALUES
            (${randomUUID()}, 'IMAGE_KIT', ${file.fileId!}, ${file.url!}, ${file.mimetype}, ${Math.floor(file.size / 1024)}, 'PHOTO_GALLERY_IMAGE', ${galleryId}, ${now}, ${now})
        `;
      }

      return tx.photoGallery.findUniqueOrThrow({
        where: { id: galleryId },
        include: { assets: true },
      });
    });
  }

  findAll() {
    return this.prisma.photoGallery.findMany({
      where: { is_deleted: false },
      include: { assets: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.photoGallery.findFirst({
      where: { id, is_deleted: false },
      include: { assets: true },
    });
    if (!record) throw new NotFoundException('معرض الصور غير موجود');
    return record;
  }

  async remove(id: string) {
    const record = await this.prisma.photoGallery.findFirst({
      where: { id, is_deleted: false },
      include: { assets: true },
    });
    if (!record) throw new NotFoundException('معرض الصور غير موجود');

    for (const asset of record.assets) {
      await this.fileService
        .deleteFileFromImageKit(asset.fileId)
        .catch(() => {});
    }

    return this.prisma.photoGallery.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
