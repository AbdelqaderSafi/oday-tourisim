import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import type { CreateHotelDto, HotelResponseDTO } from './types/hotel.dto';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { hotelValidationSchema } from './util/hotel.validation';
import {
  CreateHotelSwagger,
  FindAllHotelsSwagger,
  FindOneHotelSwagger,
  DeleteHotelSwagger,
} from './swagger/hotel.swagger';

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
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  @FindOneHotelSwagger()
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(+id);
  }

  @Delete(':id')
  @DeleteHotelSwagger()
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
