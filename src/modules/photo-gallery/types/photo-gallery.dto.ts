import { Prisma } from 'generated/prisma/client';

export type PhotoGalleryResponseDTO = Prisma.PhotoGalleryGetPayload<{
  include: { assets: true };
}>;
