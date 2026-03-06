import { hotels } from 'generated/prisma/client';

export type createHotelDto = Pick<
  hotels,
  'name' | 'description' | 'city' | 'duration' | 'stars' | 'price_per_night'
>;
