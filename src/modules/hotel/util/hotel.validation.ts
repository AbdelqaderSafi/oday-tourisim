import { z, ZodType } from 'zod';
import { CreateHotelDto, UpdateHotelDto } from '../types/hotel.dto';
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

export const updateHotelValidationSchema =
  hotelValidationSchema.partial() satisfies ZodType<Partial<UpdateHotelDto>>;

export const hotelPaginationSchema = paginationSchema.extend({
  name: z.string().min(1).max(255).optional(),
  city: z.string().min(2).max(100).optional(),
  duration: z.string().min(1).max(50).optional(),
  stars: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']).optional(),
  price_per_night: z.coerce.number().min(0).optional(),
}) satisfies ZodType<HotelQuery>;
