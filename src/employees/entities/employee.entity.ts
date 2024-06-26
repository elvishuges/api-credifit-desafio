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
import { ConsignedCredit } from 'src/consigned-credits/entities/consigned-credit.entity';

@Entity({ name: 'employee' })
export class Employee extends UserBase {
  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column()
  score: number;

  @ManyToOne(() => AgreedCompany)
  @JoinColumn({ name: 'agreedCompany_id', referencedColumnName: 'id' })
  agreedCompany: AgreedCompany;

  @OneToMany(
    () => ConsignedCredit,
    (consignedCredit) => consignedCredit.employee,
  )
  consignedCredits: ConsignedCredit[];
}
