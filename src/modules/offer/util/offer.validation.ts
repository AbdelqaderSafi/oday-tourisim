import { z, ZodType } from 'zod';
import { paginationSchema } from 'src/modules/utils/api.util';
import { Prisma } from 'generated/prisma/client';
import { CreateOfferDto, UpdateOfferDto } from '../types/offer.dto';
import { OfferQuery } from '../types/offer.types';

export const offerValidationSchema = z.object({
  destination: z.string().min(2).max(100),
  duration: z.string().min(1).max(50),
  currency: z.enum(['USD', 'EUR', 'EGP', 'ILS']),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val)),
  services: z.array(z.string().min(1).max(255)).default([]),
  is_featured: z.coerce.boolean().default(false),
}) satisfies ZodType<CreateOfferDto>;

// Zod v4 uuid() is overly strict with version/variant bits.
// Also trim whitespace/newlines that multipart/form-data can append to field values.
const uuidLike = z
  .string()
  .trim()
  .regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    'Invalid UUID',
  );

export const updateOfferValidationSchema = z.object({
  destination: z.string().trim().min(2).max(100).optional(),
  city: z.string().trim().min(2).max(100).optional(),
  duration: z.string().trim().min(1).max(50).optional(),
  currency: z.enum(['USD', 'EUR', 'EGP', 'ILS']).optional(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val))
    .optional(),
  services: z.array(z.string().trim().min(1).max(255)).optional(),
  is_featured: z.boolean().default(false),
  deleteAssetIds: z
    .union([z.array(uuidLike), uuidLike.transform((v) => [v])])
    .optional(),
}) satisfies ZodType<UpdateOfferDto>;

export const offerPaginationSchema = paginationSchema.extend({
  destination: z.string().min(1).max(255).optional(),
  is_featured: z.boolean().optional(),
}) satisfies ZodType<OfferQuery>;
