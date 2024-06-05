import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { RepresentativeService } from '../services/representative.service';
import { AgreedCompanyService } from 'src/agreed-companies/services/agreed-company.service';
import { EmployeeService } from 'src/employees/services/employee.service';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(
    private readonly representativeService: RepresentativeService,
    private readonly employeeService: EmployeeService,
  ) {}

  public async validate(email: string): Promise<boolean> {
    const representative = await this.representativeService.findByEmail(email);
    const employee = await this.employeeService.findByEmail(email);
    console.log('employee', employee);
    console.log('representative', representative);

    if (representative || employee) {
      return false;
    }
    return true;
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Usuário com este email já existe.';
  }
}
