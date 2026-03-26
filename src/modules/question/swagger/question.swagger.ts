import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

const translationExample = [
  { language: 'ar', question: 'ما هي مدة الرحلة؟', answer: 'مدة الرحلة 5 أيام' },
  { language: 'en', question: 'What is the trip duration?', answer: 'The trip is 5 days' },
];

export const CreateQuestionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة سؤال جديد' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['translations'],
        properties: {
          translations: {
            type: 'array',
            items: {
              type: 'object',
              required: ['language', 'question', 'answer'],
              properties: {
                language: { type: 'string', enum: ['ar', 'en'] },
                question: { type: 'string' },
                answer: { type: 'string' },
              },
            },
            example: translationExample,
          },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إضافة السؤال بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
  );

export const FindAllQuestionsSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'جلب جميع الأسئلة',
      description: 'جلب جميع الأسئلة الشائعة مع الترجمات ودعم الـ pagination',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      example: 1,
      description: 'رقم الصفحة',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      example: 10,
      description: 'عدد العناصر في الصفحة',
    }),
    ApiResponse({
      status: 200,
      description: 'قائمة الأسئلة مع بيانات الـ pagination',
    }),
  );

export const FindOneQuestionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب سؤال بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف السؤال (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات السؤال مع الترجمات' }),
    ApiResponse({ status: 404, description: 'السؤال غير موجود' }),
  );

export const UpdateQuestionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'تعديل سؤال' }),
    ApiParam({ name: 'id', description: 'معرّف السؤال (UUID)' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          translations: {
            type: 'array',
            items: {
              type: 'object',
              required: ['language', 'question', 'answer'],
              properties: {
                language: { type: 'string', enum: ['ar', 'en'] },
                question: { type: 'string' },
                answer: { type: 'string' },
              },
            },
            example: translationExample,
          },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'تم تعديل السؤال بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
    ApiResponse({ status: 404, description: 'السؤال غير موجود' }),
  );

export const DeleteQuestionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف سؤال' }),
    ApiParam({ name: 'id', description: 'معرّف السؤال (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
    ApiResponse({ status: 404, description: 'السؤال غير موجود' }),
  );
