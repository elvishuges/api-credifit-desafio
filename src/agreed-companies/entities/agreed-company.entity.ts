import {
  Entity,
  Column,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Base } from './../../core/entities/base';
import { User } from './../../users/entities/user.entity';
import { Employee } from './../../employees/entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Representative } from 'src/representatives/entities/representative.entity';

@Entity({ name: 'sales' })
export class AgreedCompany {
  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.agreedCompany)
  employees: Employee[];

  @OneToOne(
    () => Representative,
    (representative) => representative.agreedCompany,
  )
  representative: Representative;
}
