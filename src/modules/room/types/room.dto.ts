import { LanguageEnum, Prisma } from 'generated/prisma/client';

export type RoomTranslationInput = {
  language: LanguageEnum;
  name: string;
};

export type CreateRoomDto = {
  price: Prisma.Decimal;
  capacity: string;
  translations: RoomTranslationInput[];
};

export type UpdateRoomDto = Partial<CreateRoomDto>;

export type RoomResponseDTO = Prisma.RoomGetPayload<{
  include: { translations: true };
}>;
