import { z } from 'zod';
import { paginationSchema } from 'src/modules/utils/api.util';

const starsEnum = z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']);

export const createCommentSchema = z.object({
  client_name: z.string().min(2).max(255),
  stars: starsEnum,
  comment: z.string().min(2),
  trip_name: z.string().min(2).max(255),
  city: z.string().min(2).max(255),
});

export const updateCommentSchema = createCommentSchema.partial();

export const commentPaginationSchema = paginationSchema.extend({});
