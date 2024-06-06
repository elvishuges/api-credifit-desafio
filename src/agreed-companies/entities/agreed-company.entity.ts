import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Employee } from './../../employees/entities/employee.entity';
import { UserBase } from 'src/core/entities/userBase';

@Entity({ name: 'agreedCompanies' })
export class AgreedCompany extends UserBase {
  @Column()
  cnpj: string;

  @Column()
  companyName: string;

  @OneToMany(() => Employee, (employee) => employee.agreedCompany)
  employees: Employee[];
}
