import { HotelFilterRating, DestinatiosnEnum } from 'generated/prisma/client';
import { PaginationQueryType } from 'src/types/util.types';

export type HotelQuery = PaginationQueryType & {
  destination?: DestinatiosnEnum;
  rating?: HotelFilterRating;
};
