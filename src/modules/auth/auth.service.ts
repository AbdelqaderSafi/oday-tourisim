import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminResponseDTO, LoginDto } from './dto/auth.dto';
import { AdminService } from '../admin/admin.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<AdminResponseDTO> {
    // find user by email
    const foundAdmin = await this.adminService.findByEmail(loginDto.email);
    if (!foundAdmin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (foundAdmin.is_deleted) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // verify password with argon
    const isPasswordValid = await this.verifyPassword(
      loginDto.password,
      foundAdmin.password,
    );
    // throw error if not match
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate jwt token
    const token = this.generateJwtToken(foundAdmin.id);
    // return user data and token
    return {
      adminData: this.adminService.mapUserWithoutPassword(foundAdmin),
      token,
    };
  }

  validate(userPayload: AdminResponseDTO['adminData']) {
    // generate jwt token
    const token = this.generateJwtToken(userPayload.id);
    // return user data and token
    return {
      adminData: userPayload,
      token,
    };
  }

  private hashPassword(password: string) {
    // implement password hashing logic here
    return argon.hash(password);
  }

  private verifyPassword(password: string, hashedPassword: string) {
    return argon.verify(hashedPassword, password);
  }

  private generateJwtToken(adminId: string) {
    return this.jwtService.sign({ sub: adminId }, { expiresIn: '30d' });
  }
}
