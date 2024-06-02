import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { RepresentativeService } from 'src/representatives/services/representative.service';
import { EmployeeService } from 'src/employees/services/employee.service';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(
    private readonly usersService: UsersService,
    private readonly rerpesentativeService: RepresentativeService,
    private readonly employeeService: EmployeeService,
  ) {}

  public async validate(email: string): Promise<boolean> {
    const userExists = await this.usersService.findByEmail(email);
    const representativeExists = await this.rerpesentativeService.findByEmail(
      email,
    );
    const employeeExists = await this.employeeService.findByEmail(email);
    if (userExists) {
      return false;
    }
    return true;
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Usuário com este email já existe.';
  }
}
