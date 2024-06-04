import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRepresentativeDTO } from '../dto/update-representative.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Representative } from '../entities/representative.entity';

@Injectable()
export class RepresentativeService {
  constructor(
    @InjectRepository(Representative)
    private representativeRepository: Repository<Representative>,
  ) {}

  async create(createRepresentativeDTO: CreateRepresentativeDTO) {
    const newRepresentative = await this.representativeRepository.save(
      createRepresentativeDTO,
    );
    return this.findOne(newRepresentative.id);
  }

  async findAll() {
    return await this.representativeRepository.find();
  }

  async findOne(id: number) {
    const query = { where: { id } };

    const user = await this.representativeRepository.findOne(query);

    if (!user) {
      throw new HttpException(`user id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string) {
    const query = { where: [{ email }] };
    return await this.representativeRepository.findOne(query);
  }

  async remove(id: number) {
    return await this.representativeRepository.delete(id);
  }
}
