import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
} from 'typeorm';

import { Exclude } from 'class-transformer';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: false })
  readonly createdAt: Date;

  @UpdateDateColumn({ select: false })
  readonly updatedAt: Date;

  @DeleteDateColumn({ select: false })
  readonly deletedAt: Date;

  @VersionColumn({ select: false })
  readonly version: number;
}
