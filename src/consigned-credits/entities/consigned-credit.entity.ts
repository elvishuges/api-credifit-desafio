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

@Entity({ name: 'consignedCredits' })
export class ConsignedCredit extends Base {
  @Column()
  status: string;

  @Column()
  companyName: string;
}
