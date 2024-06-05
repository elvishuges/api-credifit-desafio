import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgreedCompany } from '../entities/agreed-company.entity';

import { Employee } from 'src/employees/entities/employee.entity';
import { CreateEmployeeDTO } from 'src/employees/dto/create-employee.dto';
import { CreateRepresentativeDTO } from 'src/representatives/dto/create-representative.dto';

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

  async create(name: string, representative: CreateRepresentativeDTO) {
    return await this.agreedCompanyRepository.save({
      name: name,
      representative: representative,
    });
  }

  async addEmployee(
    agreedCompanyId: number,
    employee: CreateEmployeeDTO,
  ): Promise<AgreedCompany> {
    const agreedCompany = await this.agreedCompanyRepository.findOne({
      where: { id: agreedCompanyId },
      relations: ['employees'],
    });

    const cratedEmployee = await this.employeeRepository.save(employee);
    agreedCompany.employees.push(cratedEmployee);
    return await this.agreedCompanyRepository.save(agreedCompany);
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
