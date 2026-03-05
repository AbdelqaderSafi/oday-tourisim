import { Admin } from 'generated/prisma/browser';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@company.com' })
  email: string;

  @ApiProperty({ example: 'SuperSecretPassword123!' })
  password: string;
}

export type AdminResponseDTO = {
  token: string;
  adminData: Omit<Admin, 'password'>;
};
