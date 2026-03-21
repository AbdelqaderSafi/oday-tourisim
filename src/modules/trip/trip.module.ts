import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { DatabaseService } from '../database/database.service';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [TripController],
  providers: [TripService, DatabaseService],
  imports: [FileModule],
})
export class TripModule {}
