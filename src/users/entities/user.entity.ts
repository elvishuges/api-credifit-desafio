import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hashSync } from 'bcrypt';

import { Base } from './../../core/entities/base';

@Entity('user')
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

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
