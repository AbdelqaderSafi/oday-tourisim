import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const CreateCommentSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة تعليق جديد' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['client_name', 'stars', 'comment', 'trip_name', 'city'],
        properties: {
          client_name: { type: 'string', example: 'أحمد محمد', maxLength: 255 },
          stars: {
            type: 'string',
            enum: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'],
            example: 'FIVE',
            description: 'تقييم النجوم',
          },
          comment: {
            type: 'string',
            example: 'رحلة رائعة وخدمة ممتازة!',
            description: 'نص التعليق',
          },
          trip_name: {
            type: 'string',
            example: 'رحلة شرم الشيخ',
            maxLength: 255,
          },
          city: { type: 'string', example: 'شرم الشيخ', maxLength: 255 },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إضافة التعليق بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
  );

export const FindAllCommentsSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'جلب جميع التعليقات',
      description: 'جلب جميع التعليقات مع دعم الـ pagination',
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
      description: 'قائمة التعليقات مع بيانات الـ pagination',
    }),
  );

export const FindOneCommentSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب تعليق بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف التعليق (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات التعليق' }),
    ApiResponse({ status: 404, description: 'التعليق غير موجود' }),
  );

export const UpdateCommentSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'تعديل تعليق' }),
    ApiParam({ name: 'id', description: 'معرّف التعليق (UUID)' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          client_name: { type: 'string', example: 'أحمد محمد', maxLength: 255 },
          stars: {
            type: 'string',
            enum: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'],
            example: 'FOUR',
          },
          comment: { type: 'string', example: 'تعليق محدث' },
          trip_name: { type: 'string', example: 'رحلة الغردقة', maxLength: 255 },
          city: { type: 'string', example: 'الغردقة', maxLength: 255 },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'تم تعديل التعليق بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
    ApiResponse({ status: 404, description: 'التعليق غير موجود' }),
  );

export const DeleteCommentSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف تعليق' }),
    ApiParam({ name: 'id', description: 'معرّف التعليق (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
    ApiResponse({ status: 404, description: 'التعليق غير موجود' }),
  );
