import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './types/offer.dto';
import { FileService } from '../file/file.service';
import { DatabaseService } from '../database/database.service';
import { randomUUID } from 'crypto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class OfferService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly filesService: FileService,
  ) {}
  async create(
    createOfferDto: CreateOfferDto,
    files: Array<Express.Multer.File>,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('يجب إرفاق صورة واحدة على الأقل للعرض');
    }

    const offerId = randomUUID();
    const { services, ...rest } = createOfferDto;

    return this.prismaService.$transaction(async (tx) => {
      await tx.offers.create({
        data: {
          id: offerId,
          ...rest,
          services: services as Prisma.InputJsonValue,
        },
      });

      const now = new Date();
      for (const file of files) {
        await tx.$executeRaw`
          INSERT INTO assets
            (id, storage_provider_name, file_id, url, file_type, file_size_in_kb, kind, offer_id, created_at, updated_at)
          VALUES
            (${randomUUID()}, 'IMAGE_KIT', ${file.fileId!}, ${file.url!}, ${file.mimetype}, ${Math.floor(file.size / 1024)}, 'OFFER_IMAGE', ${offerId}, ${now}, ${now})
        `;
      }

      // 3. إرجاع الفندق مع الـ assets
      return tx.offers.findUniqueOrThrow({
        where: { id: offerId },
        include: { assets: true },
      });
    });
  }
  findAll() {
    return `This action returns all offer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  // update(id: number, updateOfferDto: UpdateOfferDto) {
  //   return `This action updates a #${id} offer`;
  // }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
