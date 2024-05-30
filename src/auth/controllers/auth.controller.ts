import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthRegisterDTO } from '../dto/auth.register.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: AuthLoginDTO): Promise<any> {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: AuthRegisterDTO): Promise<any> {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-auth')
  getUser(): any {
    return 'Token Ok !!';
  }
}
