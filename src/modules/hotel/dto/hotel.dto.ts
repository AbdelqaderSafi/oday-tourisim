import { hotels, Prisma } from 'generated/prisma/client';

export type createHotelDto = Pick<
  hotels,
  | 'name'
  | 'description'
  | 'city'
  | 'duration'
  | 'stars'
  | 'price_per_night'
  | 'features'
>;

export type UpdateHotelDto = Partial<createHotelDto>;

export type ProductResponseDTO = Prisma.hotelsGetPayload<{
  include: { assets: true };
}>;
