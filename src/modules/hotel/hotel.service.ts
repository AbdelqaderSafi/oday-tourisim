import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateHotelDto, UpdateHotelRequest } from './types/hotel.dto';
import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { HotelQuery } from './types/hotel.types';
import { removeFields } from '../utils/object.util';

@Injectable()
export class HotelService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly filesService: FileService,
  ) {}
  // async create(
  //   createHotelDto: CreateHotelDto,
  //   files: Array<Express.Multer.File>,
  // ) {
  //   if (!files || files.length === 0) {
  //     throw new BadRequestException('يجب إرفاق صورة واحدة على الأقل للفندق');
  //   }

  //   const hotelId = randomUUID();
  //   const { features, ...rest } = createHotelDto;

  //   return this.prismaService.$transaction(async (tx) => {
  //     await tx.hotels.create({
  //       data: {
  //         id: hotelId,
  //         ...rest,
  //         features: features as Prisma.InputJsonValue,
  //       },
  //     });

  //     const now = new Date();
  //     for (const file of files) {
  //       await tx.$executeRaw`
  //         INSERT INTO assets
  //           (id, storage_provider_name, file_id, url, file_type, file_size_in_kb, kind, hotel_id, created_at, updated_at)
  //         VALUES
  //           (${randomUUID()}, 'IMAGE_KIT', ${file.fileId!}, ${file.url!}, ${file.mimetype}, ${Math.floor(file.size / 1024)}, 'HOTEL_IMAGE', ${hotelId}, ${now}, ${now})
  //       `;
  //     }

  //     // 3. إرجاع الفندق مع الـ assets
  //     return tx.hotels.findUniqueOrThrow({
  //       where: { id: hotelId },
  //       include: { assets: true },
  //     });
  //   });
  // }
  async create(
    createHotelDto: CreateHotelDto,
    files: {
      mainImages?: Express.Multer.File[];
      subImages?: Express.Multer.File[];
    },
  ) {
    // 1. التحقق من وجود صورة رئيسية واحدة على الأقل
    if (!files?.mainImages || files.mainImages.length === 0) {
      throw new BadRequestException(
        'يجب إرفاق صورة رئيسية واحدة على الأقل للفندق',
      );
    }

    const hotelId = randomUUID();
    const { features, ...rest } = createHotelDto;

    return this.prismaService.$transaction(async (tx) => {
      // 2. إنشاء الفندق
      await tx.hotels.create({
        data: {
          id: hotelId,
          ...rest,
          features: features as Prisma.InputJsonValue,
        },
      });

      const now = new Date();

      // 3. تجميع الصور الرئيسية والفرعية في مصفوفة واحدة مع تحديد نوع كل صورة (kind)
      const allAssets = [
        ...(files.mainImages || []).map((file) => ({
          ...file,
          kind: 'HOTEL_MAIN_IMAGE', // يمكنك تغيير هذا النص ليطابق الـ Enum في قاعدة بياناتك
        })),
        ...(files.subImages || []).map((file) => ({
          ...file,
          kind: 'HOTEL_SUB_IMAGE', // يمكنك تغيير هذا النص ليطابق الـ Enum في قاعدة بياناتك
        })),
      ];

      // 4. إدخال الصور في جدول assets
      for (const file of allAssets) {
        // افترضت هنا أن الخصائص fileId و url تأتي من الـ Interceptor أو من مكتبة الرفع المخصصة بك (مثل ImageKit)
        await tx.$executeRaw`
          INSERT INTO assets
            (id, storage_provider_name, file_id, url, file_type, file_size_in_kb, kind, hotel_id, created_at, updated_at)
          VALUES
            (${randomUUID()}, 'IMAGE_KIT', ${file['fileId']!}, ${file['url']!}, ${file.mimetype}, ${Math.floor(file.size / 1024)}, ${file.kind}, ${hotelId}, ${now}, ${now})
        `;
      }

      // 5. إرجاع الفندق مع الـ assets
      return tx.hotels.findUniqueOrThrow({
        where: { id: hotelId },
        include: { assets: true },
      });
    });
  }

  findAll(query: HotelQuery) {
    return this.prismaService.$transaction(async (prisma) => {
      const whereClause: Prisma.hotelsWhereInput = {
        ...(query.name && { name: { contains: query.name } }),
        ...(query.city && { city: { contains: query.city } }),
        ...(query.stars && { stars: query.stars }),
        is_deleted: false,
      };
      const pagination = this.prismaService.handleQueryPagination(query);
      const hotels = await prisma.hotels.findMany({
        ...removeFields(pagination, ['page']),
        where: whereClause,
        include: { assets: true },
      });

      const count = await prisma.hotels.count({
        where: whereClause,
      });

      return {
        data: hotels,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  findOne(id: string) {
    return this.prismaService.hotels.findUnique({
      where: { id },
      include: { assets: true },
    });
  }

  async update(
    id: string,
    updateHotelDto: UpdateHotelRequest,
    files?: Express.Multer.File[],
  ) {
    const hotel = await this.prismaService.hotels.findUnique({
      where: { id },
      include: { assets: true },
    });
    if (!hotel) throw new NotFoundException('الفندق غير موجود');

    const { features, deleteAssetIds, ...rest } = updateHotelDto;

    const fileIdsToDelete = hotel.assets
      .filter((a) => deleteAssetIds?.includes(a.id))
      .map((a) => a.fileId);

    await this.prismaService.$transaction(async (tx) => {
      if (deleteAssetIds?.length) {
        await tx.$executeRaw`
          DELETE FROM assets WHERE hotel_id = ${id}
          AND id IN (${Prisma.join(deleteAssetIds)})
        `;
      }

      await tx.hotels.update({
        where: { id },
        data: {
          ...rest,
          ...(features !== undefined && {
            features: features as Prisma.InputJsonValue,
          }),
        },
      });

      if (files?.length) {
        const now = new Date();
        for (const file of files) {
          await tx.$executeRaw`
            INSERT INTO assets
              (id, storage_provider_name, file_id, url, file_type, file_size_in_kb, kind, hotel_id, created_at, updated_at)
            VALUES
              (${randomUUID()}, 'IMAGE_KIT', ${file.fileId!}, ${file.url!}, ${file.mimetype}, ${Math.floor(file.size / 1024)}, 'HOTEL_IMAGE', ${id}, ${now}, ${now})
          `;
        }
      }
    });

    await Promise.allSettled(
      fileIdsToDelete.map((fileId) =>
        this.filesService.deleteFileFromImageKit(fileId),
      ),
    );

    return this.prismaService.hotels.findUniqueOrThrow({
      where: { id },
      include: { assets: true },
    });
  }

  remove(id: string) {
    return this.prismaService.hotels.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
