import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Representative } from 'src/representatives/entities/representative.entity';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDTO } from '../dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['agreedCompany'] });
  }

  async create(employee: CreateEmployeeDTO): Promise<Employee> {
    return await this.employeeRepository.save({
      ...employee,
    });
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['agreedCompany'],
    });
  }
  async findByEmail(email: string): Promise<Employee> {
    const query = { where: [{ email }] };
    return await this.employeeRepository.findOne(query);
  }
}
