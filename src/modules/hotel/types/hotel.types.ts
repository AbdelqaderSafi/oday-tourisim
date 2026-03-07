import { hotels_stars } from 'generated/prisma/client';
import { PaginationQueryType } from 'src/types/util.types';

export type HotelQuery = PaginationQueryType & {
  name?: string;
  city?: string;
  stars?: hotels_stars;
};
