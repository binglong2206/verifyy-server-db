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
import { User } from "./User";
import { YT_account } from "./YT_account";

@Entity()
export class YT_media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  view_count: number;

  @Column()
  like_count: number;

  @Column()
  post_url: string;

  @Column()
  asset_url: string;

  @ManyToOne(() => YT_account, (YT_account) => YT_account.medias)
  account_id: YT_account;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
