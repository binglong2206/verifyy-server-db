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

  // @Column()
  // follower_count: number;

  // @Column()
  // media_count: number;

  // @Column()
  // demographics: any;

  // @Column()
  // geographics: any;

  // cascade allows u to save with this entity and auto create the referenced entity: User
  @OneToOne(() => User, { onDelete: "CASCADE" }) // Cascade: true
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
