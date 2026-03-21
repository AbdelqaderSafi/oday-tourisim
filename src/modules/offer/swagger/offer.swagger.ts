import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

export const CreateOfferSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة عرض جديد (رفع صور فقط)' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: ['images'],
        properties: {
          images: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'صور العرض (حد أقصى 10)',
          },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إنشاء العرض بنجاح' }),
    ApiResponse({ status: 400, description: 'يجب إرفاق صورة واحدة على الأقل' }),
  );

export const FindAllOffersSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب جميع العروض' }),
    ApiResponse({ status: 200, description: 'قائمة العروض مع الصور' }),
  );

export const FindOneOfferSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب عرض بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف العرض (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات العرض مع الصور' }),
    ApiResponse({ status: 404, description: 'العرض غير موجود' }),
  );

export const DeleteOfferSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف عرض' }),
    ApiParam({ name: 'id', description: 'معرّف العرض (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'العرض غير موجود' }),
  );
