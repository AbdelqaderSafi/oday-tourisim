import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from '../database/database.service';
import type {
  CreateFlightTypeDto,
  CreateSecurityServiceTypeDto,
  UpdateFlightTypeDto,
  UpdateSecurityServiceTypeDto,
} from './types/security-approval.dto';

@Injectable()
export class SecurityApprovalService {
  constructor(private readonly prisma: DatabaseService) {}

  // ─── Security Service Types ───────────────────────────────────────────────

  async createServiceType(dto: CreateSecurityServiceTypeDto) {
    return this.prisma.$transaction(async (tx) => {
      const record = await tx.securityServiceType.create({
        data: { price: dto.price as Prisma.Decimal },
      });

      for (const translation of dto.translations) {
        await tx.securityServiceTypeTranslation.create({
          data: { service_type_id: record.id, ...translation },
        });
      }

      return tx.securityServiceType.findUniqueOrThrow({
        where: { id: record.id },
        include: { translations: true },
      });
    });
  }

  findAllServiceTypes() {
    return this.prisma.securityServiceType.findMany({
      where: { is_deleted: false },
      include: { translations: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOneServiceType(id: string) {
    const record = await this.prisma.securityServiceType.findFirst({
      where: { id, is_deleted: false },
      include: { translations: true },
    });
    if (!record) throw new NotFoundException('نوع الخدمة الأمنية غير موجود');
    return record;
  }

  async updateServiceType(id: string, dto: UpdateSecurityServiceTypeDto) {
    await this.findOneServiceType(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.securityServiceType.update({
        where: { id },
        data: {
          ...(dto.price !== undefined && {
            price: dto.price as Prisma.Decimal,
          }),
        },
      });

      if (dto.translations?.length) {
        for (const translation of dto.translations) {
          await tx.securityServiceTypeTranslation.upsert({
            where: {
              service_type_id_language: {
                service_type_id: id,
                language: translation.language,
              },
            },
            update: {
              name: translation.name,
              description: translation.description,
            },
            create: { service_type_id: id, ...translation },
          });
        }
      }

      return tx.securityServiceType.findUniqueOrThrow({
        where: { id },
        include: { translations: true },
      });
    });
  }

  async removeServiceType(id: string) {
    await this.findOneServiceType(id);
    return this.prisma.securityServiceType.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // ─── Flight Types ─────────────────────────────────────────────────────────

  async createFlightType(dto: CreateFlightTypeDto) {
    return this.prisma.$transaction(async (tx) => {
      const record = await tx.flightType.create({
        data: { price: dto.price as Prisma.Decimal },
      });

      for (const translation of dto.translations) {
        await tx.flightTypeTranslation.create({
          data: { flight_type_id: record.id, ...translation },
        });
      }

      return tx.flightType.findUniqueOrThrow({
        where: { id: record.id },
        include: { translations: true },
      });
    });
  }

  findAllFlightTypes() {
    return this.prisma.flightType.findMany({
      where: { is_deleted: false },
      include: { translations: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOneFlightType(id: string) {
    const record = await this.prisma.flightType.findFirst({
      where: { id, is_deleted: false },
      include: { translations: true },
    });
    if (!record) throw new NotFoundException('نوع الطيران غير موجود');
    return record;
  }

  async updateFlightType(id: string, dto: UpdateFlightTypeDto) {
    await this.findOneFlightType(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.flightType.update({
        where: { id },
        data: {
          ...(dto.price !== undefined && {
            price: dto.price as Prisma.Decimal,
          }),
        },
      });

      if (dto.translations?.length) {
        for (const translation of dto.translations) {
          await tx.flightTypeTranslation.upsert({
            where: {
              flight_type_id_language: {
                flight_type_id: id,
                language: translation.language,
              },
            },
            update: { name: translation.name },
            create: { flight_type_id: id, ...translation },
          });
        }
      }

      return tx.flightType.findUniqueOrThrow({
        where: { id },
        include: { translations: true },
      });
    });
  }

  async removeFlightType(id: string) {
    await this.findOneFlightType(id);
    return this.prisma.flightType.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
