import { offers, Prisma } from 'generated/prisma/client';

export type CreateOfferDto = Pick<
  offers,
  'destination' | 'price' | 'currency' | 'duration' | 'services' | 'is_featured'
>;

export type UpdateOfferDto = Partial<CreateOfferDto>;

export type OfferResponseDTO = Prisma.offersGetPayload<{
  include: { assets: true };
}>;
