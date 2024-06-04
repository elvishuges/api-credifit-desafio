import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { Employee } from './../../employees/entities/employee.entity';
import { Representative } from 'src/representatives/entities/representative.entity';

@Entity({ name: 'agreedCompanies' })
export class AgreedCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.agreedCompany)
  employees: Employee[];

  @JoinColumn()
  @OneToOne(
    () => Representative,
    (representative) => representative.agreedCompany,
    {
      cascade: true,
    },
  )
  representative: Representative;
}
