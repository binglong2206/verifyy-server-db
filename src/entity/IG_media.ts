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
  ManyToOne,
} from "typeorm";
import { IG_account } from "./IG_account";
import { User } from "./User";

@Entity()
export class IG_media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like_count: number;

  @Column()
  engagements: number;

  @Column()
  impressions: number;

  @Column()
  reach: number;

  @Column()
  post_url: string;

  @Column()
  asset_url: string;

  @ManyToOne(() => IG_account, (account_id) => account_id.medias)
  account: IG_account;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
