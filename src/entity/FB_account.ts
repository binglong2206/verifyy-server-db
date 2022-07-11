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
export class FB_account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followers: number;

  @Column()
  like_counts: number;

  @Column()
  impressions: number;

  @Column()
  engagements: number;

  @Column()
  media_counts: number;

  @Column()
  demographics: JSON;

  @Column()
  geographics: JSON;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user_id: User;
}
