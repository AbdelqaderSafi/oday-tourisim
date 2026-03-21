import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

export const CreatePhotoGallerySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة صور لمعرض الصور' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: ['images'],
        properties: {
          images: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'صور المعرض (حد أقصى 10)',
          },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إضافة الصور بنجاح' }),
    ApiResponse({
      status: 400,
      description: 'يجب إرفاق صورة واحدة على الأقل',
    }),
  );

export const FindAllPhotoGalleriesSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب جميع صور المعرض' }),
    ApiResponse({ status: 200, description: 'قائمة صور المعرض' }),
  );

export const FindOnePhotoGallerySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب مجموعة صور بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف المجموعة (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات المجموعة مع الصور' }),
    ApiResponse({ status: 404, description: 'معرض الصور غير موجود' }),
  );

export const DeletePhotoGallerySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف مجموعة صور من المعرض' }),
    ApiParam({ name: 'id', description: 'معرّف المجموعة (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'معرض الصور غير موجود' }),
  );
