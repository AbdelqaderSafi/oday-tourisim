import { LanguageEnum, Nationality, Prisma } from 'generated/prisma/client';

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

// ─── Flight Types ─────────────────────────────────────────────────────────────

export type FlightTypeTranslationInput = {
  language: LanguageEnum;
  name: string;
};

export type CreateFlightTypeDto = {
  price: Prisma.Decimal;
  translations: FlightTypeTranslationInput[];
};

export type UpdateFlightTypeDto = Partial<CreateFlightTypeDto>;

export type FlightTypeResponseDTO = Prisma.FlightTypeGetPayload<{
  include: { translations: true };
}>;

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
