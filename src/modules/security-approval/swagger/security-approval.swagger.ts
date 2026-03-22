import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

const translationExample = (nameAr: string, nameEn: string, withDesc = false) =>
  withDesc
    ? [
        { language: 'ar', name: nameAr, description: 'وصف بالعربي' },
        { language: 'en', name: nameEn, description: 'Description in English' },
      ]
    : [
        { language: 'ar', name: nameAr },
        { language: 'en', name: nameEn },
      ];

const serviceTypeTranslationItem = {
  type: 'object',
  required: ['language', 'name', 'description'],
  properties: {
    language: { type: 'string', enum: ['ar', 'en'], example: 'ar' },
    name: { type: 'string', example: 'تأشيرة دخول' },
    description: {
      type: 'string',
      example: 'استخراج تأشيرة الدخول للوجهة المطلوبة',
    },
  },
};

const flightTypeTranslationItem = {
  type: 'object',
  required: ['language', 'name'],
  properties: {
    language: { type: 'string', enum: ['ar', 'en'], example: 'ar' },
    name: { type: 'string', example: 'درجة سياحية' },
  },
};

// ─── Security Service Types ───────────────────────────────────────────────────

export const CreateSecurityServiceTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة نوع خدمة أمنية جديد' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['price', 'translations'],
        properties: {
          price: { type: 'number', example: 150, minimum: 0 },
          translations: {
            type: 'array',
            items: serviceTypeTranslationItem,
            example: translationExample('تأشيرة دخول', 'Entry Visa', true),
          },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إنشاء نوع الخدمة بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
  );

export const FindAllSecurityServiceTypesSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب جميع أنواع الخدمات الأمنية' }),
    ApiResponse({
      status: 200,
      description: 'قائمة أنواع الخدمات الأمنية مع الترجمات',
    }),
  );

export const FindOneSecurityServiceTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب نوع خدمة أمنية بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف نوع الخدمة (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات نوع الخدمة مع الترجمات' }),
    ApiResponse({ status: 404, description: 'نوع الخدمة غير موجود' }),
  );

export const UpdateSecurityServiceTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'تعديل نوع خدمة أمنية' }),
    ApiParam({ name: 'id', description: 'معرّف نوع الخدمة (UUID)' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          price: { type: 'number', example: 200, minimum: 0 },
          translations: {
            type: 'array',
            items: serviceTypeTranslationItem,
          },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'تم التعديل بنجاح' }),
    ApiResponse({ status: 404, description: 'نوع الخدمة غير موجود' }),
  );

export const DeleteSecurityServiceTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف نوع خدمة أمنية' }),
    ApiParam({ name: 'id', description: 'معرّف نوع الخدمة (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'نوع الخدمة غير موجود' }),
  );

// ─── Flight Types ─────────────────────────────────────────────────────────────

export const CreateFlightTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة نوع طيران جديد' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['price', 'translations'],
        properties: {
          price: { type: 'number', example: 500, minimum: 0 },
          translations: {
            type: 'array',
            items: flightTypeTranslationItem,
            example: translationExample('درجة سياحية', 'Economy Class'),
          },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إنشاء نوع الطيران بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
  );

export const FindAllFlightTypesSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب جميع أنواع الطيران' }),
    ApiResponse({ status: 200, description: 'قائمة أنواع الطيران مع الترجمات' }),
  );

export const FindOneFlightTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب نوع طيران بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف نوع الطيران (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات نوع الطيران مع الترجمات' }),
    ApiResponse({ status: 404, description: 'نوع الطيران غير موجود' }),
  );

export const UpdateFlightTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'تعديل نوع طيران' }),
    ApiParam({ name: 'id', description: 'معرّف نوع الطيران (UUID)' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          price: { type: 'number', example: 800, minimum: 0 },
          translations: {
            type: 'array',
            items: flightTypeTranslationItem,
          },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'تم التعديل بنجاح' }),
    ApiResponse({ status: 404, description: 'نوع الطيران غير موجود' }),
  );

export const DeleteFlightTypeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف نوع طيران' }),
    ApiParam({ name: 'id', description: 'معرّف نوع الطيران (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'نوع الطيران غير موجود' }),
  );

// ─── Nationality Pricing ──────────────────────────────────────────────────────

export const GetAllNationalitiesSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب قائمة جميع الجنسيات المتاحة' }),
    ApiResponse({ status: 200, description: 'قائمة الجنسيات' }),
  );

export const CreateNationalityPricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة تسعيرة لجنسية جديدة' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['nationality', 'price_24h', 'price_72h'],
        properties: {
          nationality: {
            type: 'string',
            enum: [
              'PALESTINIAN', 'PALESTINIAN_SHARM_ONLY', 'PALESTINIAN_SYRIAN',
              'SYRIAN', 'LEBANESE', 'IRAQI', 'IRAQ_DOCUMENT', 'LIBYAN',
              'YEMENI', 'AFRICAN', 'ASIAN', 'KAZAKHSTAN', 'UZBEKISTAN',
              'TURKMENISTAN', 'KYRGYZSTAN', 'TAJIKISTAN', 'SUDANESE',
              'SAINT_KITTS_AND_NEVIS', 'DOMINICA',
            ],
            example: 'LIBYAN',
          },
          price_24h: { type: 'number', example: 75, minimum: 0 },
          price_72h: { type: 'number', example: 50, minimum: 0 },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إنشاء التسعيرة بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 409, description: 'تسعيرة هذه الجنسية موجودة مسبقاً' }),
  );

export const FindAllNationalityPricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب جميع تسعيرات الجنسيات' }),
    ApiResponse({ status: 200, description: 'قائمة تسعيرات الجنسيات' }),
  );

export const FindOneNationalityPricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب تسعيرة جنسية بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف التسعيرة (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات تسعيرة الجنسية' }),
    ApiResponse({ status: 404, description: 'التسعيرة غير موجودة' }),
  );

export const FindNationalityPricingByNationalitySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب تسعيرة حسب الجنسية' }),
    ApiParam({
      name: 'nationality',
      description: 'اسم الجنسية (مثال: LIBYAN)',
      enum: [
        'PALESTINIAN', 'PALESTINIAN_SHARM_ONLY', 'PALESTINIAN_SYRIAN',
        'SYRIAN', 'LEBANESE', 'IRAQI', 'IRAQ_DOCUMENT', 'LIBYAN',
        'YEMENI', 'AFRICAN', 'ASIAN', 'KAZAKHSTAN', 'UZBEKISTAN',
        'TURKMENISTAN', 'KYRGYZSTAN', 'TAJIKISTAN', 'SUDANESE',
        'SAINT_KITTS_AND_NEVIS', 'DOMINICA',
      ],
    }),
    ApiResponse({ status: 200, description: 'بيانات تسعيرة الجنسية' }),
    ApiResponse({ status: 404, description: 'لا توجد تسعيرة لهذه الجنسية' }),
  );

export const UpdateNationalityPricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'تعديل تسعيرة جنسية' }),
    ApiParam({ name: 'id', description: 'معرّف التسعيرة (UUID)' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          nationality: {
            type: 'string',
            enum: [
              'PALESTINIAN', 'PALESTINIAN_SHARM_ONLY', 'PALESTINIAN_SYRIAN',
              'SYRIAN', 'LEBANESE', 'IRAQI', 'IRAQ_DOCUMENT', 'LIBYAN',
              'YEMENI', 'AFRICAN', 'ASIAN', 'KAZAKHSTAN', 'UZBEKISTAN',
              'TURKMENISTAN', 'KYRGYZSTAN', 'TAJIKISTAN', 'SUDANESE',
              'SAINT_KITTS_AND_NEVIS', 'DOMINICA',
            ],
          },
          price_24h: { type: 'number', example: 75, minimum: 0 },
          price_72h: { type: 'number', example: 50, minimum: 0 },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'تم التعديل بنجاح' }),
    ApiResponse({ status: 404, description: 'التسعيرة غير موجودة' }),
  );

export const DeleteNationalityPricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف تسعيرة جنسية' }),
    ApiParam({ name: 'id', description: 'معرّف التسعيرة (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'التسعيرة غير موجودة' }),
  );
