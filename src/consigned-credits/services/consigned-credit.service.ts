import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsignedCredit } from '../entities/consigned-credit.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class ConsignedCreditService {
  constructor(
    @InjectRepository(ConsignedCredit)
    private readonly consignedCreditRepository: Repository<ConsignedCredit>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async simulate(
    employeeId: number,
    consignedCreditValue: number,
  ): Promise<any[]> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    this.validationAvailableMargin(employee, consignedCreditValue);

    const installmentObject =
      this.createInstallmentsObject(consignedCreditValue);
    return installmentObject;
  }

  validationAvailableMargin(employee: Employee, consignedCreditValue: number) {
    if (consignedCreditValue > employee.salary * 0.35) {
      throw new NotFoundException(
        'Valor Solicitado não pode exceder 35% do salário',
      );
    }
  }
  createInstallmentsObject(consignedCreditValue: number): any[] {
    let installmentObject: any = {
      consignedCreditValue: consignedCreditValue,
      installments: [],
    };
    for (let i = 1; i <= 4; i++) {
      const installmentValue = consignedCreditValue / i;
      installmentObject.installments.push({
        numberOfInstallments: i,
        installmentValue: parseFloat(installmentValue.toFixed(2)),
      });
    }

    return installmentObject;
  }
}
