import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.save(createUserDto);
    return this.findOne(newUser.id);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const query = { where: { id } };

    const user = await this.userRepository.findOne(query);

    if (!user) {
      throw new HttpException(`user id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string) {
    const query = { where: [{ email }] };
    return await this.userRepository.findOne(query);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
