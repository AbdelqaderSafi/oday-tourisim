import { z, ZodType } from 'zod';
import { CreateHotelDto, UpdateHotelRequest } from '../types/hotel.dto';
import { paginationSchema } from 'src/modules/utils/api.util';
import { HotelQuery } from '../types/hotel.types';
import { Prisma } from 'generated/prisma/client';

export const hotelValidationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  city: z.string().min(2).max(100),
  duration: z.string().min(1).max(50),
  stars: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
  price_per_night: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val)),
  features: z.array(z.string().min(1).max(255)).default([]),
}) satisfies ZodType<CreateHotelDto>;

// Zod v4 uuid() is overly strict with version/variant bits.
// Also trim whitespace/newlines that multipart/form-data can append to field values.
const uuidLike = z
  .string()
  .trim()
  .regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    'Invalid UUID',
  );

export const updateHotelValidationSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  description: z.string().trim().min(2).max(1000).optional(),
  city: z.string().trim().min(2).max(100).optional(),
  duration: z.string().trim().min(1).max(50).optional(),
  stars: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']).optional(),
  price_per_night: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val))
    .optional(),
  features: z.array(z.string().trim().min(1).max(255)).optional(),
  deleteAssetIds: z
    .union([
      z.array(uuidLike),
      uuidLike.transform((v) => [v]), // دعم قيمة واحدة بدون array
    ])
    .optional(),
}) satisfies ZodType<UpdateHotelRequest>;

export const hotelPaginationSchema = paginationSchema.extend({
  name: z.string().min(1).max(255).optional(),
  city: z.string().min(2).max(100).optional(),
  stars: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']).optional(),
}) satisfies ZodType<HotelQuery>;
