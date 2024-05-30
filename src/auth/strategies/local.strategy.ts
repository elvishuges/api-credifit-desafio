import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { compare } from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  public async validate(email: string, pass: string): Promise<any> {
    const user = await this.authService.findUser(email);

    if (!user) {
      throw this.throwUnauthorizedException();
    }
    if (user && !(await compare(pass, user.password))) {
      throw this.throwUnauthorizedException();
    }

    return user;
  }

  public throwUnauthorizedException() {
    throw new UnauthorizedException('Email ou senha incorretos');
  }
}
