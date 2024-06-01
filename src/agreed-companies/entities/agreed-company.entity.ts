import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Employee } from './../../employees/entities/employee.entity';
import { Representative } from 'src/representatives/entities/representative.entity';

@Entity({ name: 'sales' })
export class AgreedCompany {
  @PrimaryGeneratedColumn()
  id: number;

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
