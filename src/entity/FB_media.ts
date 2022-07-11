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
import { Url } from "url";
import { User } from "./User";
import { FB_account } from "./FB_account";

@Entity()
export class FB_media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like_count: number;

  @Column()
  post_url: string;

  @Column()
  asset_url: string;

  @ManyToOne(() => FB_account, (FB_account) => FB_account.medias)
  account_id: FB_account;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
