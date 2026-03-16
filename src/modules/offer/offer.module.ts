import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { DatabaseService } from '../database/database.service';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [OfferController],
  providers: [OfferService, DatabaseService],
  imports: [FileModule],
})
export class OfferModule {}
