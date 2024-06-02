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

  async findAll() {
    return this.employeeRepository.find({ relations: ['products'] });
  }

  async create(employee: CreateEmployeeDTO) {
    return await this.employeeRepository.save({
      ...employee,
    });
  }

  async findOne(id: number) {
    const query = { where: { id } };

    const sale = await this.employeeRepository.find({
      loadRelationIds: { relations: ['products'] },
    });

    if (!sale) {
      throw new HttpException(`sale id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return sale;
  }
  async findByEmail(email: string) {
    const query = { where: [{ email }] };
    return await this.employeeRepository.findOne(query);
  }
}
