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

const airlineEnumValues = [
  'QATAR_AIRWAYS', 'EMIRATES', 'AEGEAN',
  'TURKISH_AIRLINES', 'OMAN_AIR', 'OTHER',
];

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

// ─── Airline Pricing ──────────────────────────────────────────────────────────

export const GetAllAirlinesSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب قائمة جميع شركات الطيران المتاحة' }),
    ApiResponse({ status: 200, description: 'قائمة شركات الطيران' }),
  );

export const CreateAirlinePricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'إضافة تسعيرة لشركة طيران' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['airline', 'price'],
        properties: {
          airline: {
            type: 'string',
            enum: airlineEnumValues,
            example: 'EMIRATES',
          },
          price: { type: 'number', example: 100, minimum: 0 },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'تم إنشاء التسعيرة بنجاح' }),
    ApiResponse({ status: 400, description: 'بيانات غير صحيحة' }),
    ApiResponse({ status: 409, description: 'تسعيرة شركة الطيران هذه موجودة مسبقاً' }),
  );

export const FindAllAirlinePricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب جميع تسعيرات شركات الطيران' }),
    ApiResponse({ status: 200, description: 'قائمة تسعيرات شركات الطيران' }),
  );

export const FindOneAirlinePricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب تسعيرة شركة طيران بالـ ID' }),
    ApiParam({ name: 'id', description: 'معرّف التسعيرة (UUID)' }),
    ApiResponse({ status: 200, description: 'بيانات تسعيرة شركة الطيران' }),
    ApiResponse({ status: 404, description: 'التسعيرة غير موجودة' }),
  );

export const FindAirlinePricingByAirlineSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'جلب تسعيرة حسب شركة الطيران' }),
    ApiParam({
      name: 'airline',
      description: 'اسم شركة الطيران (مثال: EMIRATES)',
      enum: airlineEnumValues,
    }),
    ApiResponse({ status: 200, description: 'بيانات تسعيرة شركة الطيران' }),
    ApiResponse({ status: 404, description: 'لا توجد تسعيرة لشركة الطيران هذه' }),
  );

export const UpdateAirlinePricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'تعديل تسعيرة شركة طيران' }),
    ApiParam({ name: 'id', description: 'معرّف التسعيرة (UUID)' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          airline: { type: 'string', enum: airlineEnumValues },
          price: { type: 'number', example: 150, minimum: 0 },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'تم التعديل بنجاح' }),
    ApiResponse({ status: 404, description: 'التسعيرة غير موجودة' }),
  );

export const DeleteAirlinePricingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'حذف تسعيرة شركة طيران' }),
    ApiParam({ name: 'id', description: 'معرّف التسعيرة (UUID)' }),
    ApiResponse({ status: 200, description: 'تم الحذف بنجاح' }),
    ApiResponse({ status: 404, description: 'التسعيرة غير موجودة' }),
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
