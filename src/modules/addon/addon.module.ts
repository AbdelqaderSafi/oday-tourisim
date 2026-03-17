import { Module } from '@nestjs/common';
import { AddonService } from './addon.service';
import { AddonController } from './addon.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [AddonController],
  providers: [AddonService, DatabaseService],
})
export class AddonModule {}
