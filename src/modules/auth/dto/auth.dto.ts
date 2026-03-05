import { Admin } from 'generated/prisma/browser';

export type LoginDto = Pick<Admin, 'email' | 'password'>;

export type AdminResponseDTO = {
  token: string;
  adminData: Omit<Admin, 'password'>;
};
