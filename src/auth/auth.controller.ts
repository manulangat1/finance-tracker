import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/database/entities/User.Entity';
import { LoginDTO, RegisterDTO } from './dto';

import { Public } from 'src/common/decorators/Public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  async getAllUsers(): Promise<User[]> {
    return await this.authService.getUser();
  }

  @Post('token')
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() dto: LoginDTO) {
    return await this.authService.login(dto);
  }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }
}
