import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  PaginationQueryType,
  PaginationResponseMeta,
} from 'src/types/util.types';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is missing');
    const adapter = new PrismaMariaDb(url);

    const isProd = process.env.NODE_ENV === 'production';
    super({ adapter, log: isProd ? ['warn', 'error'] : ['query', 'info', 'warn', 'error'] });
  }
  async onModuleInit() {
    await this.$connect();
  }

  handleQueryPagination(query: PaginationQueryType) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    return { skip: (page - 1) * limit, take: limit, page };
  }

  formatPaginationResponse(args: {
    page: number;
    count: number;
    limit: number;
  }): PaginationResponseMeta {
    return {
      meta: {
        total: args.count,
        page: args.page,
        limit: args.limit,
        totalPages: Math.ceil(args.count / args.limit),
      },
    };
  }
}
