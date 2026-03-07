import { hotels, Prisma } from 'generated/prisma/client';

export type CreateHotelDto = Pick<
  hotels,
  | 'name'
  | 'description'
  | 'city'
  | 'duration'
  | 'stars'
  | 'price_per_night'
  | 'features'
>;

export type UpdateHotelDto = Partial<CreateHotelDto>;

export type UpdateHotelRequest = UpdateHotelDto & {
  deleteAssetIds?: string[];
};

export type HotelResponseDTO = Prisma.hotelsGetPayload<{
  include: { assets: true };
}>;
