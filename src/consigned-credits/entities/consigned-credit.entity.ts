import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { AgreedCompany } from 'src/agreed-companies/entities/agreed-company.entity';
import { Base } from 'src/core/entities/base';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity({ name: 'consignedCredits' })
export class ConsignedCredit extends Base {
  @Column({ default: '' })
  statusInfos: string;

  @Column({ default: 0 })
  status: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalConsignedCredit: number;

  @Column({ default: 0 })
  numberInstallments: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dateNextInstallment: Date;

  @Column({ default: 0 })
  currentInstallment: number;

  @ManyToOne(() => AgreedCompany, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: AgreedCompany;

  @ManyToOne(() => Employee, (employee) => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
