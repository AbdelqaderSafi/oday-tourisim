import { z } from 'zod';
import { Airline, Nationality, Prisma } from 'generated/prisma/client';

const priceSchema = z.coerce
  .number()
  .min(0)
  .transform((val) => new Prisma.Decimal(val));

const serviceTypeTranslationSchema = z.object({
  language: z.enum(['ar', 'en']),
  name: z.string().min(2).max(255),
  description: z.string().min(2),
});

export const createSecurityServiceTypeSchema = z.object({
  price: priceSchema,
  translations: z.array(serviceTypeTranslationSchema).min(1).max(2),
});

export const updateSecurityServiceTypeSchema = z.object({
  price: priceSchema.optional(),
  translations: z.array(serviceTypeTranslationSchema).min(1).max(2).optional(),
});

// ─── Airline Pricing ──────────────────────────────────────────────────────────

const airlineValues = Object.values(Airline) as [string, ...string[]];

export const createAirlinePricingSchema = z.object({
  airline: z.enum(airlineValues),
  price: priceSchema,
});

export const updateAirlinePricingSchema = z.object({
  airline: z.enum(airlineValues).optional(),
  price: priceSchema.optional(),
});

// ─── Nationality Pricing ──────────────────────────────────────────────────────

const nationalityValues = Object.values(Nationality) as [string, ...string[]];

export const createNationalityPricingSchema = z.object({
  nationality: z.enum(nationalityValues),
  price_24h: priceSchema,
  price_72h: priceSchema,
});

export const updateNationalityPricingSchema = z.object({
  nationality: z.enum(nationalityValues).optional(),
  price_24h: priceSchema.optional(),
  price_72h: priceSchema.optional(),
});
