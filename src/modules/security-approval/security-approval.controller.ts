import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Nationality } from 'generated/prisma/client';
import { SecurityApprovalService } from './security-approval.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import {
  createSecurityServiceTypeSchema,
  updateSecurityServiceTypeSchema,
  createFlightTypeSchema,
  updateFlightTypeSchema,
  createNationalityPricingSchema,
  updateNationalityPricingSchema,
} from './util/security-approval.validation';
import type {
  CreateSecurityServiceTypeDto,
  UpdateSecurityServiceTypeDto,
  CreateFlightTypeDto,
  UpdateFlightTypeDto,
  CreateNationalityPricingDto,
  UpdateNationalityPricingDto,
} from './types/security-approval.dto';
import {
  CreateSecurityServiceTypeSwagger,
  FindAllSecurityServiceTypesSwagger,
  FindOneSecurityServiceTypeSwagger,
  UpdateSecurityServiceTypeSwagger,
  DeleteSecurityServiceTypeSwagger,
  CreateFlightTypeSwagger,
  FindAllFlightTypesSwagger,
  FindOneFlightTypeSwagger,
  UpdateFlightTypeSwagger,
  DeleteFlightTypeSwagger,
  GetAllNationalitiesSwagger,
  CreateNationalityPricingSwagger,
  FindAllNationalityPricingSwagger,
  FindOneNationalityPricingSwagger,
  FindNationalityPricingByNationalitySwagger,
  UpdateNationalityPricingSwagger,
  DeleteNationalityPricingSwagger,
} from './swagger/security-approval.swagger';

@ApiTags('الموافقات الأمنية')
@ApiBearerAuth()
@Controller('security-approval')
export class SecurityApprovalController {
  constructor(private readonly service: SecurityApprovalService) {}

  // ─── Security Service Types ───────────────────────────────────────────────

  @Post('service-type')
  @CreateSecurityServiceTypeSwagger()
  createServiceType(
    @Body(new ZodValidationPipe(createSecurityServiceTypeSchema))
    dto: CreateSecurityServiceTypeDto,
  ) {
    return this.service.createServiceType(dto);
  }

  @Get('service-type')
  @FindAllSecurityServiceTypesSwagger()
  findAllServiceTypes() {
    return this.service.findAllServiceTypes();
  }

  @Get('service-type/:id')
  @FindOneSecurityServiceTypeSwagger()
  findOneServiceType(@Param('id') id: string) {
    return this.service.findOneServiceType(id);
  }

  @Patch('service-type/:id')
  @UpdateSecurityServiceTypeSwagger()
  updateServiceType(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateSecurityServiceTypeSchema))
    dto: UpdateSecurityServiceTypeDto,
  ) {
    return this.service.updateServiceType(id, dto);
  }

  @Delete('service-type/:id')
  @DeleteSecurityServiceTypeSwagger()
  removeServiceType(@Param('id') id: string) {
    return this.service.removeServiceType(id);
  }

  // ─── Flight Types ─────────────────────────────────────────────────────────

  @Post('flight-type')
  @CreateFlightTypeSwagger()
  createFlightType(
    @Body(new ZodValidationPipe(createFlightTypeSchema))
    dto: CreateFlightTypeDto,
  ) {
    return this.service.createFlightType(dto);
  }

  @Get('flight-type')
  @FindAllFlightTypesSwagger()
  findAllFlightTypes() {
    return this.service.findAllFlightTypes();
  }

  @Get('flight-type/:id')
  @FindOneFlightTypeSwagger()
  findOneFlightType(@Param('id') id: string) {
    return this.service.findOneFlightType(id);
  }

  @Patch('flight-type/:id')
  @UpdateFlightTypeSwagger()
  updateFlightType(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateFlightTypeSchema))
    dto: UpdateFlightTypeDto,
  ) {
    return this.service.updateFlightType(id, dto);
  }

  @Delete('flight-type/:id')
  @DeleteFlightTypeSwagger()
  removeFlightType(@Param('id') id: string) {
    return this.service.removeFlightType(id);
  }

  // ─── Nationality Pricing ──────────────────────────────────────────────────

  @Get('nationalities')
  @GetAllNationalitiesSwagger()
  getAllNationalities() {
    return this.service.getAllNationalities();
  }

  @Post('nationality-pricing')
  @CreateNationalityPricingSwagger()
  createNationalityPricing(
    @Body(new ZodValidationPipe(createNationalityPricingSchema))
    dto: CreateNationalityPricingDto,
  ) {
    return this.service.createNationalityPricing(dto);
  }

  @Get('nationality-pricing')
  @FindAllNationalityPricingSwagger()
  findAllNationalityPricing() {
    return this.service.findAllNationalityPricing();
  }

  @Get('nationality-pricing/by-nationality/:nationality')
  @FindNationalityPricingByNationalitySwagger()
  findNationalityPricingByNationality(
    @Param('nationality') nationality: Nationality,
  ) {
    return this.service.findNationalityPricingByNationality(nationality);
  }

  @Get('nationality-pricing/:id')
  @FindOneNationalityPricingSwagger()
  findOneNationalityPricing(@Param('id') id: string) {
    return this.service.findOneNationalityPricing(id);
  }

  @Patch('nationality-pricing/:id')
  @UpdateNationalityPricingSwagger()
  updateNationalityPricing(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateNationalityPricingSchema))
    dto: UpdateNationalityPricingDto,
  ) {
    return this.service.updateNationalityPricing(id, dto);
  }

  @Delete('nationality-pricing/:id')
  @DeleteNationalityPricingSwagger()
  removeNationalityPricing(@Param('id') id: string) {
    return this.service.removeNationalityPricing(id);
  }
}
