import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateHotelDto } from './types/hotel.dto';
import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';

@Injectable()
export class HotelService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly filesService: FileService,
  ) {}
  async create(
    createHotelDto: CreateHotelDto,
    files: Array<Express.Multer.File>,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('يجب إرفاق صورة واحدة على الأقل للفندق');
    }

    const hotelId = randomUUID();
    const { features, ...rest } = createHotelDto;

    return this.prismaService.$transaction(async (tx) => {
      // 1. إنشاء الفندق
      await tx.hotels.create({
        data: {
          id: hotelId,
          ...rest,
          features: features as Prisma.InputJsonValue,
        },
      });

      // 2. إنشاء الـ assets بـ raw SQL لتجاوز bug في Prisma v7 generator
      //    مع optional relation fields
      const now = new Date();
      for (const file of files) {
        await tx.$executeRaw`
          INSERT INTO assets
            (id, storage_provider_name, file_id, url, file_type, file_size_in_kb, kind, hotel_id, created_at, updated_at)
          VALUES
            (${randomUUID()}, 'IMAGE_KIT', ${file.fileId!}, ${file.url!}, ${file.mimetype}, ${Math.floor(file.size / 1024)}, 'HOTEL_IMAGE', ${hotelId}, ${now}, ${now})
        `;
      }

      // 3. إرجاع الفندق مع الـ assets
      return tx.hotels.findUniqueOrThrow({
        where: { id: hotelId },
        include: { assets: true },
      });
    });
  }

  findAll() {
    return `This action returns all hotel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  // update(id: number, updateHotelDto: UpdateHotelDto) {
  //   return `This action updates a #${id} hotel`;
  // }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
