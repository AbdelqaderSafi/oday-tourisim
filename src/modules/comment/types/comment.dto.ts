import { comments_stars, Prisma } from 'generated/prisma/client';

export type CreateCommentDto = {
  client_name: string;
  stars: comments_stars;
  comment: string;
  trip_name: string;
  city: string;
};

export type UpdateCommentDto = Partial<CreateCommentDto>;

export type CommentResponseDTO = Prisma.commentsGetPayload<object>;
