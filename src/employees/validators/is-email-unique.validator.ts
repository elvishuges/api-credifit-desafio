import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';

import { EmployeeService } from '../services/employee.service';
import { RepresentativeService } from 'src/representatives/services/representative.service';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly representativeService: RepresentativeService,
  ) {}

  public async validate(email: string): Promise<boolean> {
    const user = await this.employeeService.findByEmail(email);
    const representative = await this.representativeService.findByEmail(email);
    if (user || representative) {
      return false;
    }
    return true;
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Usuário com este email já existe.';
  }
}
