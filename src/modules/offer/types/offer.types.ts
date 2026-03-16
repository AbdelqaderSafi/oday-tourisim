import { PaginationQueryType } from 'src/types/util.types';

export type OfferQuery = PaginationQueryType & {
  destination?: string;
  is_featured?: boolean;
};
