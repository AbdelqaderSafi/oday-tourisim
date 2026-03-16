import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './modules/hotel/hotel.module';
import { file } from 'zod';
import { FileModule } from './modules/file/file.module';
import { OfferModule } from './modules/offer/offer.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HotelModule,
    FileModule,
    OfferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
