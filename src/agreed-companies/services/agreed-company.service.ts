import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgreedCompany } from '../entities/agreed-company.entity';

import { CreateAgreedCompanyDTO } from '../dto/create-agreed-company.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AgreedCompanyService {
  constructor(
    @InjectRepository(AgreedCompany)
    private readonly agreedCompanyRespository: Repository<AgreedCompany>,
  ) {}

  async findAll() {
    return this.agreedCompanyRespository.find({ relations: ['products'] });
  }

  async create(name: string) {
    return await this.agreedCompanyRespository.save({
      name: name,
    });
  }

  async findOne(id: number) {
    const query = { where: { id } };

    const sale = await this.agreedCompanyRespository.find({
      loadRelationIds: { relations: ['products'] },
    });

    if (!sale) {
      throw new HttpException(`sale id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return sale;
  }
}
