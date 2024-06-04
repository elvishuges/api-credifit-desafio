import {
  Entity,
  Column,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from 'src/core/entities/userBase';
import { AgreedCompany } from 'src/agreed-companies/entities/agreed-company.entity';
import { Base } from 'src/core/entities/base';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity({ name: 'consignedCredits' })
export class ConsignedCredit extends Base {
  @Column()
  status: string;

  @Column()
  statusInfos: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalConsignedCredit: number;

  @Column()
  numberInstallments: number;

  @Column()
  dateNextInstallment: Date;

  @Column()
  currentInstallment: number;

  @ManyToOne(() => AgreedCompany, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: AgreedCompany;

  @ManyToOne(() => Employee, (employee) => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
