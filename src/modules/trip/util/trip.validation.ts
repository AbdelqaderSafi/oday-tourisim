import { z } from 'zod';
import { paginationSchema } from 'src/modules/utils/api.util';
import { TripQuery } from '../types/trip.types';
import { Prisma } from 'generated/prisma/client';

const tripTranslationSchema = z.object({
  language: z.enum(['ar', 'en']),
  title: z.string().min(2).max(255),
  subtitle: z.string().min(2).max(255),
  description: z.string().min(2),
  duration: z.string().min(1).max(255),
  facilities: z.array(z.string().min(1).max(255)),
});

// In multipart/form-data, translations arrive as a JSON string
const translationsField = z
  .string()
  .transform((val) => JSON.parse(val) as unknown)
  .pipe(z.array(tripTranslationSchema).min(1).max(2));

const tripOptionInputSchema = z.object({
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val)),
  translations: z
    .array(
      z.object({
        language: z.enum(['ar', 'en']),
        name: z.string().min(2).max(255),
        description: z.string().min(2).optional(),
      }),
    )
    .min(1)
    .max(2),
});

const tripAddonInputSchema = z.object({
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val)),
  translations: z
    .array(
      z.object({
        language: z.enum(['ar', 'en']),
        name: z.string().min(2).max(255),
        description: z.string().min(2),
      }),
    )
    .min(1)
    .max(2),
});

// options and addons also arrive as JSON strings in multipart/form-data
const optionsField = z
  .string()
  .transform((val) => JSON.parse(val) as unknown)
  .pipe(z.array(tripOptionInputSchema))
  .optional();

const addonsField = z
  .string()
  .transform((val) => JSON.parse(val) as unknown)
  .pipe(z.array(tripAddonInputSchema))
  .optional();

export const tripValidationSchema = z.object({
  slug: z.string().min(2).max(255),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val)),
  start_time: z.string().min(1).max(255),
  end_time: z.string().min(1).max(255),
  translations: translationsField,
  options: optionsField,
  addons: addonsField,
});

// Zod v4 uuid() is overly strict with version/variant bits.
// Also trim whitespace/newlines that multipart/form-data can append to field values.
const uuidLike = z
  .string()
  .trim()
  .regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    'Invalid UUID',
  );

export const updateTripValidationSchema = z.object({
  slug: z.string().min(2).max(255).optional(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => new Prisma.Decimal(val))
    .optional(),
  start_time: z.string().min(1).max(255).optional(),
  end_time: z.string().min(1).max(255).optional(),
  translations: translationsField.optional(),
  options: optionsField,
  addons: addonsField,
  deleteAssetIds: z
    .union([z.array(uuidLike), uuidLike.transform((v) => [v])])
    .optional(),
});

export const tripPaginationSchema = paginationSchema.extend({
  // يمكن إضافة فلاتر إضافية هنا لاحقاً
}) satisfies z.ZodType<TripQuery>;
