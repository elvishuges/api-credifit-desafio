import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
  Index,
} from 'typeorm';

import { hashSync } from 'bcrypt';

import { Exclude } from 'class-transformer';

export abstract class UserBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({
    transformer: {
      to(password: string) {
        return hashSync(password, 10);
      },
      from(hash: string) {
        return hash;
      },
    },
  })
  @Exclude({ toPlainOnly: false })
  password: string;
}
