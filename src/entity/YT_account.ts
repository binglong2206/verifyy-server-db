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

  @Column()
  subscribers: number;

  @Column()
  view_count: number;

  @Column()
  uploads: number;

  @Column({ type: "simple-json" })
  demographics: JSON;

  @Column({ type: "simple-json" })
  geographics: JSON;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => YT_media, (YT_media) => YT_media.account_id)
  medias: YT_media[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
