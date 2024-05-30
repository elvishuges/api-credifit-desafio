import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { User } from '../../users/entities/user.entity';
import { AuthRegisterDTO } from '../dto/auth.register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async findUser(email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  public async login(loginDto: AuthLoginDTO): Promise<any> {
    const payload: any = { email: loginDto.email, sub: loginDto.password };
    const accessToken = this.jwtService.sign(payload);
    const user = await this.findUser(loginDto.email);
    return {
      email: user.email,
      accessToken,
    };
  }

  public async register(loginDto: AuthRegisterDTO): Promise<any> {
    return this.usersService.create(loginDto);
  }
}
