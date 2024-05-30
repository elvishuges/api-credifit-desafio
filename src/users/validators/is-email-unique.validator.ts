import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';

import { UsersService } from '../services/users.service';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  public async validate(email: string): Promise<boolean> {
    const userExists = await this.usersService.findByEmail(email);
    if (userExists) {
      return false;
    }
    return true;
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Usuário com este email já existe.';
  }
}
