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

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  view_count: number;

  @Column({ nullable: true })
  like_count: number;

  @Column({ nullable: true })
  comment_count: number;

  @ManyToOne(() => YT_account, (YT_account) => YT_account.medias, {
    onDelete: "CASCADE",
  })
  account: YT_account;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
