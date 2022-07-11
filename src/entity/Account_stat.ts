import { Request, Response } from "express";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Account_stat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  impressions: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user_id: User;
}
