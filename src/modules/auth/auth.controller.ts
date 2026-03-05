import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AdminResponseDTO, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @IsPublic(true)
  login(@Body() loginDTO: LoginDto): Promise<AdminResponseDTO> {
    return this.authService.login(loginDTO);
  }
}
