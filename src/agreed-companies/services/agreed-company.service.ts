import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgreedCompany } from '../entities/agreed-company.entity';

import { CreateAgreedCompanyDTO } from '../dto/create-agreed-company.dto';
import { User } from 'src/users/entities/user.entity';
import { Representative } from 'src/representatives/entities/representative.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class AgreedCompanyService {
  constructor(
    @InjectRepository(AgreedCompany)
    private readonly agreedCompanyRepository: Repository<AgreedCompany>,

    @InjectRepository(AgreedCompany)
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
      throw new Error('AgreedCompany not found');
    }

    return agreedCompany.employees;
  }

  async create(name: string, representative: Representative) {
    return await this.agreedCompanyRepository.save({
      name: name,
      representative: representative,
    });
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
