import { z } from 'zod';
import { Prisma } from 'generated/prisma/client';

const roomTranslationSchema = z.object({
  language: z.enum(['ar', 'en']),
  name: z.string().min(2).max(255),
});

export const createRoomValidationSchema = z.object({
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val)),
  capacity: z.string().min(1).max(50),
  translations: z.array(roomTranslationSchema).min(1).max(2),
});

export const updateRoomValidationSchema = z.object({
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val))
    .optional(),
  capacity: z.string().min(1).max(50).optional(),
  translations: z.array(roomTranslationSchema).min(1).max(2).optional(),
});
