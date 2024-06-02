import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgreedCompany } from '../entities/agreed-company.entity';

import { CreateAgreedCompanyDTO } from '../dto/create-agreed-company.dto';
import { User } from 'src/users/entities/user.entity';
import { Representative } from 'src/representatives/entities/representative.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateEmployeeDTO } from 'src/employees/dto/create-employee.dto';

@Injectable()
export class AgreedCompanyService {
  constructor(
    @InjectRepository(AgreedCompany)
    private readonly agreedCompanyRepository: Repository<AgreedCompany>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll() {
    return this.agreedCompanyRepository.find({
      relations: ['representative'],
    });
  }
  async findAllEmployees(agreedCompanyId: number) {
    const agreedCompany = await this.agreedCompanyRepository.findOne({
      where: { id: agreedCompanyId },
      relations: ['employees'],
    });

    if (!agreedCompany) {
      throw new NotFoundException(`The requested record was not found`);
    }

    return agreedCompany.employees;
  }

  async create(name: string, representative: Representative) {
    return await this.agreedCompanyRepository.save({
      name: name,
      representative: representative,
    });
  }
  async addEmployee(agreedCompanyId: number, employee: CreateEmployeeDTO) {
    const agreedCompany = await this.agreedCompanyRepository.findOne({
      where: { id: agreedCompanyId },
      relations: ['employees'],
    });
    const cratedEmployee = this.employeeRepository.create(employee);
    cratedEmployee.agreedCompany = agreedCompany;
    agreedCompany.employees.push(cratedEmployee);
    return this.agreedCompanyRepository.save(agreedCompany);
  }

  async findOne(id: number): Promise<AgreedCompany> {
    const query = { where: { id }, relations: ['employees'] };

    const agreedCompany = await this.agreedCompanyRepository.findOne(query);

    if (!agreedCompany) {
      throw new HttpException(
        `agreedCompany id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return agreedCompany;
  }
}
