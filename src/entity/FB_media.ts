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

  @Column({ nullable: true })
  like_count: number;

  @Column({ nullable: true })
  comment_count: number;

  @Column({ nullable: true })
  src_url: string;

  @Column({ nullable: true })
  media_url: string;

  @Column({ nullable: true })
  impression_count: string;

  @ManyToOne(() => FB_account, (FB_account) => FB_account.medias)
  account: FB_account;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
