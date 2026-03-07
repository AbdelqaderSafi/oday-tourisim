import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

export const CreateHotelSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'إنشاء فندق جديد',
      description: 'إنشاء فندق مع رفع صورة أو أكثر (حتى 10 صور)',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: [
          'name',
          'description',
          'city',
          'duration',
          'stars',
          'price_per_night',
          'file',
        ],
        properties: {
          name: {
            type: 'string',
            example: 'فندق النخيل',
            minLength: 2,
            maxLength: 100,
          },
          description: {
            type: 'string',
            example: 'فندق فاخر في قلب المدينة',
            minLength: 2,
            maxLength: 1000,
          },
          city: {
            type: 'string',
            example: 'دبي',
            minLength: 2,
            maxLength: 100,
          },
          duration: {
            type: 'string',
            example: '3 ليالي',
            minLength: 1,
            maxLength: 50,
          },
          stars: {
            type: 'string',
            enum: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'],
            example: 'FIVE',
          },
          price_per_night: { type: 'number', example: 250, minimum: 0 },
          'features[0]': {
            type: 'string',
            example: 'مسبح',
            description: 'ميزة الفندق (كرر للمزيد)',
          },
          'features[1]': { type: 'string', example: 'واي فاي مجاني' },
          file: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'صور الفندق (حتى 10 صور)',
          },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إنشاء الفندق بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
  );

export const FindAllHotelsSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب جميع الفنادق' }),
    ApiResponse({ status: 200, description: 'قائمة الفنادق' }),
  );

export const FindOneHotelSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب فندق بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف الفندق', example: 'uuid-here' }),
    ApiResponse({ status: 200, description: 'بيانات الفندق' }),
    ApiResponse({ status: 404, description: 'الفندق غير موجود' }),
  );

export const DeleteHotelSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف فندق' }),
    ApiParam({ name: 'id', description: 'معرّف الفندق', example: 'uuid-here' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'الفندق غير موجود' }),
  );
