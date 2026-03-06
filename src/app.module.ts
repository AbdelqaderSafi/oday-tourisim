import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './modules/hotel/hotel.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HotelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
