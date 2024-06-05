import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { AgreedCompanyService } from '../services/agreed-company.service';
import { EmployeeService } from 'src/employees/services/employee.service';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(
    private readonly agreedCompanyService: AgreedCompanyService,
    private readonly employeeService: EmployeeService,
  ) {}

  public async validate(email: string): Promise<boolean> {
    const company = await this.agreedCompanyService.findByEmail(email);
    const employee = await this.employeeService.findByEmail(email);
    if (company || employee) {
      return false;
    }
    return true;
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Usuário com este email já existe.';
  }
}
