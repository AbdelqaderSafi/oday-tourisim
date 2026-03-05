import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvVariables } from 'src/types/declartion-mergin';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    AdminModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
