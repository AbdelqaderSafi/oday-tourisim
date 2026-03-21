import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './modules/hotel/hotel.module';
import { FileModule } from './modules/file/file.module';
import { OfferModule } from './modules/offer/offer.module';
import { RoomModule } from './modules/room/room.module';
import { AddonModule } from './modules/addon/addon.module';
import { TripModule } from './modules/trip/trip.module';
import { SecurityApprovalModule } from './modules/security-approval/security-approval.module';
import { PhotoGalleryModule } from './modules/photo-gallery/photo-gallery.module';

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
    RoomModule,
    AddonModule,
    TripModule,
    SecurityApprovalModule,
    PhotoGalleryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
