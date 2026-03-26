import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { CreateCommentDto, UpdateCommentDto } from './types/comment.dto';
import type { PaginationQueryType } from 'src/types/util.types';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: DatabaseService) {}

  create(dto: CreateCommentDto) {
    return this.prisma.comments.create({ data: dto });
  }

  async findAll(query: PaginationQueryType) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.comments.findMany({
        where: { is_deleted: false },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.comments.count({ where: { is_deleted: false } }),
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
    const comment = await this.prisma.comments.findFirst({
      where: { id, is_deleted: false },
    });
    if (!comment) throw new NotFoundException('التعليق غير موجود');
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto) {
    await this.findOne(id);
    return this.prisma.comments.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.comments.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
