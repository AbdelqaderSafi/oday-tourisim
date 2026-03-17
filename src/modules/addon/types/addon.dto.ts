import { LanguageEnum, Prisma } from 'generated/prisma/client';

export type AddonTranslationInput = {
  language: LanguageEnum;
  name: string;
  description: string;
};

export type CreateAddonDto = {
  price: Prisma.Decimal;
  translations: AddonTranslationInput[];
};

export type UpdateAddonDto = Partial<CreateAddonDto>;

export type AddonResponseDTO = Prisma.AddonGetPayload<{
  include: { translations: true };
}>;
