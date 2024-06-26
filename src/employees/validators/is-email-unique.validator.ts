import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';

import { EmployeeService } from '../services/employee.service';
import { AgreedCompanyService } from 'src/agreed-companies/services/agreed-company.service';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly agreedCompanyService: AgreedCompanyService,
  ) {}

  public async validate(email: string): Promise<boolean> {
    const employee = await this.employeeService.findByEmail(email);
    const company = await this.agreedCompanyService.findByEmail(email);
    if (employee || company) {
      return false;
    }
    return true;
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Usuário com este email já existe.';
  }
}
