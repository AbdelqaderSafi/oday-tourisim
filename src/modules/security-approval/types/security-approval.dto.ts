import {
  Airline,
  LanguageEnum,
  Nationality,
  Prisma,
} from 'generated/prisma/client';

// ─── Security Service Types ───────────────────────────────────────────────────

export type SecurityServiceTypeTranslationInput = {
  language: LanguageEnum;
  name: string;
  description: string;
};

export type CreateSecurityServiceTypeDto = {
  price: Prisma.Decimal;
  translations: SecurityServiceTypeTranslationInput[];
};

export type UpdateSecurityServiceTypeDto =
  Partial<CreateSecurityServiceTypeDto>;

export type SecurityServiceTypeResponseDTO =
  Prisma.SecurityServiceTypeGetPayload<{
    include: { translations: true };
  }>;

// ─── Airline Pricing ──────────────────────────────────────────────────────────

export type CreateAirlinePricingDto = {
  airline: Airline;
  price: Prisma.Decimal;
};

export type UpdateAirlinePricingDto = Partial<CreateAirlinePricingDto>;

export type AirlinePricingResponseDTO =
  Prisma.AirlinePricingGetPayload<{}>;

// ─── Nationality Pricing ──────────────────────────────────────────────────────

export type CreateNationalityPricingDto = {
  nationality: Nationality;
  price_24h: Prisma.Decimal;
  price_72h: Prisma.Decimal;
};

export type UpdateNationalityPricingDto =
  Partial<CreateNationalityPricingDto>;

export type NationalityPricingResponseDTO =
  Prisma.NationalityPricingGetPayload<{}>;
