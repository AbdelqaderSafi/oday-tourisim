import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, DatabaseService],
})
export class RoomModule {}
