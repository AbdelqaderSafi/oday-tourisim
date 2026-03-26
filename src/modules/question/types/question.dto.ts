import { LanguageEnum, Prisma } from 'generated/prisma/client';

export type QuestionTranslationInput = {
  language: LanguageEnum;
  question: string;
  answer: string;
};

export type CreateQuestionDto = {
  translations: QuestionTranslationInput[];
};

export type UpdateQuestionDto = Partial<CreateQuestionDto>;

export type QuestionResponseDTO = Prisma.questionsGetPayload<{
  include: { translations: true };
}>;
