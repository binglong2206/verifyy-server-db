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

  @Column({ nullable: true })
  like_count: number;

  @Column({ nullable: true })
  comment_count: number;

  @Column({ nullable: true })
  media_url: string;

  @Column({ nullable: true })
  src_url: string;

  @ManyToOne(() => IG_account, (account_id) => account_id.medias, {
    onDelete: "CASCADE",
  })
  account: IG_account;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
