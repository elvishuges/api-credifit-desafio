import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hashSync } from 'bcrypt';

import { Base } from '../../core/entities/base';
import { UserBase } from 'src/core/entities/userBase';
import { AgreedCompany } from 'src/agreed-companies/entities/agreed-company.entity';

@Entity('representative')
export class Representative extends UserBase {
  @Column()
  cnpj: string;

  @Column()
  companyName: string;

  @OneToOne(
    () => AgreedCompany,
    (agreedCompany) => agreedCompany.representative,
  )
  agreedCompany: AgreedCompany;
}
