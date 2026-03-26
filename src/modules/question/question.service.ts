import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { CreateQuestionDto, UpdateQuestionDto } from './types/question.dto';
import type { PaginationQueryType } from 'src/types/util.types';


@Injectable()
export class QuestionService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(dto: CreateQuestionDto) {
    return this.prisma.questions.create({
      data: {
        translations: {
          create: dto.translations,
        },
      },
      include: { translations: true },
    });
  }

  async findAll(query: PaginationQueryType) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.questions.findMany({
        where: { is_deleted: false },
        include: { translations: true },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.questions.count({ where: { is_deleted: false } }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const question = await this.prisma.questions.findFirst({
      where: { id, is_deleted: false },
      include: { translations: true },
    });
    if (!question) throw new NotFoundException('السؤال غير موجود');
    return question;
  }

  async update(id: string, dto: UpdateQuestionDto) {
    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      if (dto.translations?.length) {
        for (const translation of dto.translations) {
          await tx.questions_translations.upsert({
            where: {
              question_id_language: {
                question_id: id,
                language: translation.language,
              },
            },
            update: {
              question: translation.question,
              answer: translation.answer,
            },
            create: { question_id: id, ...translation },
          });
        }
      }

      return tx.questions.findUniqueOrThrow({
        where: { id },
        include: { translations: true },
      });
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.questions.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
