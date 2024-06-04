import {
  Entity,
  Column,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from 'src/core/entities/userBase';
import { AgreedCompany } from 'src/agreed-companies/entities/agreed-company.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'employee' })
export class Employee extends UserBase {
  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column()
  score: number;

  @ManyToOne(() => AgreedCompany, (agreedCompany) => agreedCompany.employees)
  @JoinColumn({ name: 'agreedCompany_id' })
  agreedCompany: AgreedCompany;
}
