import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import type {
  CreateOfferDto,
  OfferResponseDTO,
  UpdateOfferDto,
} from './types/offer.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import {
  offerValidationSchema,
  updateOfferValidationSchema,
} from './util/offer.validation';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file', 10), FileCleanupInterceptor)
  create(
    @Body(new ZodValidationPipe(offerValidationSchema))
    createOfferDto: CreateOfferDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ): Promise<OfferResponseDTO> {
    return this.offerService.create(createOfferDto, files);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body(new ZodValidationPipe(updateOfferValidationSchema))
  //   updateOfferDto: UpdateOfferDto,
  // ) {
  //   return this.offerService.update(+id, updateOfferDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
