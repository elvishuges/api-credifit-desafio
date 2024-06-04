import {
  Body,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsignedCredit } from '../entities/consigned-credit.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { AgreedCompany } from 'src/agreed-companies/entities/agreed-company.entity';
import { CreateConsignedCreditDTO } from '../dto/create-consigned-credit.dto copy';

@Injectable()
export class ConsignedCreditService {
  constructor(
    @InjectRepository(ConsignedCredit)
    private readonly consignedCreditRepository: Repository<ConsignedCredit>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(AgreedCompany)
    private readonly agreedCompanyRepository: Repository<AgreedCompany>,
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
  async create(
    createConsignedCreditDTO: CreateConsignedCreditDTO,
  ): Promise<ConsignedCredit | any> {
    const employee = await this.employeeRepository.findOne({
      where: { id: createConsignedCreditDTO.employeeId },
      relations: ['agreedCompany'],
    });

    if (!employee) {
      throw new NotFoundException('Funcionário não vinculado a uma empresa');
    }
    const validScore = this.isAutomaticallyApproved(
      employee.salary,
      employee.score,
    );

    // if (validScore) {
    //   throw new NotFoundException('Funcionário não vinculado a uma empresa');
    // }

    return 'installmentObject';
  }

  isAutomaticallyApproved(salary: number, score: number): boolean {
    if (salary <= 2000) {
      return score >= 400;
    } else if (salary <= 4000) {
      return score >= 500;
    } else if (salary <= 8000) {
      return score >= 600;
    } else if (salary <= 12000) {
      return score >= 700;
    }
    return true; // Caso o salário seja superior a 12.000 ou não atenda aos critérios
  }

  validationAvailableMargin(employee: Employee, consignedCreditValue: number) {
    if (consignedCreditValue > employee.salary * 0.35) {
      throw new UnauthorizedException(
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