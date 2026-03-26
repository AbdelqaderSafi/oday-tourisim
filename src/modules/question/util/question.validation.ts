import { z } from 'zod';
import { paginationSchema } from 'src/modules/utils/api.util';

const questionTranslationSchema = z.object({
  language: z.enum(['ar', 'en']),
  question: z.string().min(2),
  answer: z.string().min(2),
});

export const createQuestionSchema = z.object({
  translations: z.array(questionTranslationSchema).min(1).max(2),
});

export const updateQuestionSchema = z.object({
  translations: z.array(questionTranslationSchema).min(1).max(2).optional(),
});

export const questionPaginationSchema = paginationSchema.extend({});
