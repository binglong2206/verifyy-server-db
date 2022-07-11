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
export class IG_account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile_views: number;

  @Column()
  followers: number;

  @Column()
  like_count: number;

  @Column()
  impressions: number;

  @Column()
  reach: number;

  @Column()
  media_count: number;

  @Column()
  demographics: JSON;

  @Column()
  geographics: JSON;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user_id: User;
}
