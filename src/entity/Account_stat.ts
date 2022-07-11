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

  @Column({ nullable: true })
  impressions: number;

  // cascade allows u to save with this entity and auto create the referenced entity: User
  @OneToOne(() => User, { onDelete: "CASCADE" }) // Cascade: true
  @JoinColumn()
  user_id: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
