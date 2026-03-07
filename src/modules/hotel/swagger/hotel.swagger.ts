import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
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
    ApiOperation({
      summary: 'جلب جميع الفنادق',
      description: 'جلب الفنادق مع دعم الفلترة والـ pagination',
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
    ApiQuery({
      name: 'name',
      required: false,
      type: String,
      example: 'النخيل',
      description: 'البحث باسم الفندق',
    }),
    ApiQuery({
      name: 'city',
      required: false,
      type: String,
      example: 'دبي',
      description: 'فلتر حسب المدينة',
    }),
    ApiQuery({
      name: 'stars',
      required: false,
      enum: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'],
      description: 'فلتر حسب عدد النجوم',
    }),
    ApiResponse({
      status: 200,
      description: 'قائمة الفنادق مع بيانات الـ pagination',
    }),
  );

export const FindOneHotelSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'جلب فندق بالـ ID',
      description: 'جلب بيانات فندق محدد مع جميع صوره',
    }),
    ApiParam({
      name: 'id',
      description: 'معرّف الفندق (UUID)',
      example: 'bf176f2b-d79a-4b70-a8dd-e9f86f191371',
    }),
    ApiResponse({
      status: 200,
      description: 'بيانات الفندق مع الصور',
      schema: {
        example: {
          id: 'bf176f2b-d79a-4b70-a8dd-e9f86f191371',
          name: 'فندق النخيل',
          description: 'فندق فاخر في قلب المدينة',
          stars: 'FIVE',
          city: 'دبي',
          duration: '3 ليالي',
          price_per_night: '250.00',
          features: ['مسبح', 'واي فاي مجاني'],
          is_deleted: false,
          created_at: '2026-03-07T10:00:00.000Z',
          updated_at: '2026-03-07T10:00:00.000Z',
          assets: [
            {
              id: 'uuid',
              url: 'https://ik.imagekit.io/...',
              fileType: 'image/jpeg',
              kind: 'HOTEL_IMAGE',
            },
          ],
        },
      },
    }),
    ApiResponse({ status: 404, description: 'الفندق غير موجود' }),
  );

export const UpdateHotelSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'تعديل فندق',
      description: 'تعديل بيانات الفندق. يمكن حذف صور محددة عبر deleteAssetIds وإضافة صور جديدة عبر file',
    }),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      description: 'معرّف الفندق (UUID)',
      example: 'bf176f2b-d79a-4b70-a8dd-e9f86f191371',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name:                  { type: 'string', example: 'فندق النخيل المحدث', minLength: 2, maxLength: 100 },
          description:           { type: 'string', example: 'وصف محدث', minLength: 2, maxLength: 1000 },
          city:                  { type: 'string', example: 'أبوظبي', minLength: 2, maxLength: 100 },
          duration:              { type: 'string', example: '5 ليالي', minLength: 1, maxLength: 50 },
          stars:                 { type: 'string', enum: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'], example: 'FOUR' },
          price_per_night:       { type: 'number', example: 300, minimum: 0 },
          'features[0]':         { type: 'string', example: 'سبا', description: 'ميزة (اختياري)' },
          'deleteAssetIds[0]':   { type: 'string', format: 'uuid', description: 'معرّف صورة لحذفها' },
          'deleteAssetIds[1]':   { type: 'string', format: 'uuid', description: 'معرّف صورة لحذفها' },
          file: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'صور جديدة تُضاف للفندق (اختياري)',
          },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'تم تعديل الفندق بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 401, description: 'غير مصرح' }),
    ApiResponse({ status: 404, description: 'الفندق غير موجود' }),
  );

export const DeleteHotelSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف فندق' }),
    ApiParam({ name: 'id', description: 'معرّف الفندق', example: 'uuid-here' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'الفندق غير موجود' }),
  );
