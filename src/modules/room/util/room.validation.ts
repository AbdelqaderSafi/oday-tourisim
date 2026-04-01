import { z } from 'zod';
import { Prisma } from 'generated/prisma/client';

const roomTranslationSchema = z.object({
  language: z.enum(['ar', 'en']),
  name: z.string().min(2).max(255),
  description: z.string().min(1).optional(),
});

export const createRoomValidationSchema = z.object({
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val)),
  translations: z.array(roomTranslationSchema).min(1).max(2),
});

export const updateRoomValidationSchema = z.object({
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val))
    .optional(),
  translations: z.array(roomTranslationSchema).min(1).max(2).optional(),
});
