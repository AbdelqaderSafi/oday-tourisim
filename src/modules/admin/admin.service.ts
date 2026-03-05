import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Admin } from 'generated/prisma/client';
import { AdminResponseDTO } from '../auth/dto/auth.dto';
import { removeFields } from '../utils/object.util';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: DatabaseService) {}

  findByEmail(email: string) {
    return this.prismaService.admin.findUnique({
      where: { email },
    });
  }

  mapUserWithoutPassword(
    admin: Admin,
  ): AdminResponseDTO['adminData'] {
    const userWithoutPassword = removeFields(admin, ['password']);

    return {
      ...userWithoutPassword,
      id: userWithoutPassword.id,
    };
  }
}
