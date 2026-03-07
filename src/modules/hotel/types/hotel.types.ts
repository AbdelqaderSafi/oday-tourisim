import { PaginationQueryType } from 'src/types/util.types';

export type HotelQuery = PaginationQueryType & {
  name?: string;
};
