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

  @Column({nullable: true})
  follower_count: number;

  @Column({nullable: true})
  media_count: number;

  @Column({nullable: true })
  profile_image: string;

  @Column({nullable: true })
  background_image: string;


  // @Column({type: 'simple-json', nullable: true})
  // demographics: any;

  // @Column({type: 'simple-json', nullable: true})
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
