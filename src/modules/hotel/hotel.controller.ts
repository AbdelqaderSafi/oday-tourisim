import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import type {
  CreateHotelDto,
  HotelResponseDTO,
  UpdateHotelRequest,
} from './types/hotel.dto';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import {
  hotelPaginationSchema,
  hotelValidationSchema,
  updateHotelValidationSchema,
} from './util/hotel.validation';
import {
  CreateHotelSwagger,
  FindAllHotelsSwagger,
  FindOneHotelSwagger,
  UpdateHotelSwagger,
  DeleteHotelSwagger,
} from './swagger/hotel.swagger';
import type { HotelQuery } from './types/hotel.types';

@ApiTags('Hotels')
@ApiBearerAuth()
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file', 10), FileCleanupInterceptor)
  @CreateHotelSwagger()
  create(
    @Body(new ZodValidationPipe(hotelValidationSchema))
    createHotelDto: CreateHotelDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ): Promise<HotelResponseDTO> {
    return this.hotelService.create(createHotelDto, files);
  }

  @Get()
  @FindAllHotelsSwagger()
  findAll(
    @Query(new ZodValidationPipe(hotelPaginationSchema)) query: HotelQuery,
  ) {
    return this.hotelService.findAll(query);
  }

  @Get(':id')
  @FindOneHotelSwagger()
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('file'), FileCleanupInterceptor)
  @UpdateHotelSwagger()
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateHotelValidationSchema))
    updatePayload: UpdateHotelRequest,
    @UploadedFiles()
    files?: Array<Express.Multer.File>,
  ): Promise<HotelResponseDTO> {
    return this.hotelService.update(id, updatePayload, files);
  }

  @Delete(':id')
  @DeleteHotelSwagger()
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}
