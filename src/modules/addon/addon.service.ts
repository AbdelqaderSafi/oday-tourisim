import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService } from '../database/database.service';
import { CreateAddonDto, UpdateAddonDto } from './types/addon.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AddonService {
  constructor(private readonly prismaService: DatabaseService) {}

  async create(hotelId: string, dto: CreateAddonDto) {
    const hotel = await this.prismaService.hotels.findUnique({
      where: { id: hotelId, is_deleted: false },
    });
    if (!hotel) throw new NotFoundException('الفندق غير موجود');

    const addonId = randomUUID();
    const { translations, price } = dto;

    return this.prismaService.$transaction(async (tx) => {
      await tx.addon.create({
        data: {
          id: addonId,
          hotel_id: hotelId,
          price: price as Prisma.Decimal,
        },
      });

      for (const translation of translations) {
        await tx.addonTranslation.create({
          data: { addon_id: addonId, ...translation },
        });
      }

      return tx.addon.findUniqueOrThrow({
        where: { id: addonId },
        include: { translations: true },
      });
    });
  }

  findAll(hotelId: string) {
    return this.prismaService.addon.findMany({
      where: { hotel_id: hotelId, is_deleted: false },
      include: { translations: true },
    });
  }

  async findOne(hotelId: string, id: string) {
    const addon = await this.prismaService.addon.findFirst({
      where: { id, hotel_id: hotelId, is_deleted: false },
      include: { translations: true },
    });
    if (!addon) throw new NotFoundException('الإضافة غير موجودة');
    return addon;
  }

  async update(hotelId: string, id: string, dto: UpdateAddonDto) {
    const addon = await this.prismaService.addon.findFirst({
      where: { id, hotel_id: hotelId, is_deleted: false },
    });
    if (!addon) throw new NotFoundException('الإضافة غير موجودة');

    const { translations, price } = dto;

    return this.prismaService.$transaction(async (tx) => {
      await tx.addon.update({
        where: { id },
        data: {
          ...(price !== undefined && { price: price as Prisma.Decimal }),
        },
      });

      if (translations?.length) {
        for (const translation of translations) {
          await tx.addonTranslation.upsert({
            where: {
              addon_id_language: {
                addon_id: id,
                language: translation.language,
              },
            },
            update: {
              name: translation.name,
              description: translation.description,
            },
            create: { addon_id: id, ...translation },
          });
        }
      }

      return tx.addon.findUniqueOrThrow({
        where: { id },
        include: { translations: true },
      });
    });
  }

  async remove(hotelId: string, id: string) {
    const addon = await this.prismaService.addon.findFirst({
      where: { id, hotel_id: hotelId, is_deleted: false },
    });
    if (!addon) throw new NotFoundException('الإضافة غير موجودة');

    return this.prismaService.addon.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
