import {
  Entity,
  Column,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Base } from '../../core/entities/base';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from 'src/core/entities/userBase';
import { AgreedCompany } from 'src/agreed-companies/entities/agreed-company.entity';

@Entity({ name: 'employee' })
export class Employee extends UserBase {
  @Column()
  salary: string;

  @ManyToOne(() => AgreedCompany, (agreedCompany) => agreedCompany.employees)
  agreedCompany: AgreedCompany;
}
