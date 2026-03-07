import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [HotelController],
  providers: [HotelService, DatabaseService],
  imports: [FileModule],
})
export class HotelModule {}
