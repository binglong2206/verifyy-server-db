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
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { YT_media } from "./YT_media";

@Entity()
export class YT_account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  subscribers: number;

  @Column({ nullable: true })
  view_count: number;

  @Column({ nullable: true })
  uploads: number;

  @Column({ type: "simple-json", nullable: true })
  demographics: JSON;

  @Column({ type: "simple-json", nullable: true })
  geographics: JSON;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => YT_media, (YT_media) => YT_media.account)
  medias: YT_media[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
