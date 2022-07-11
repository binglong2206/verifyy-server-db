import { Request, Response } from "express";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column()
  firstname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  hashed_password: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
