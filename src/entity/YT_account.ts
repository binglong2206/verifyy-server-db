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
  username: string

  @Column({ nullable: true })
  profile_image: string

  @Column({ nullable: true })
  follower_count: number;

  @Column({ nullable: true })
  view_count: number;

  @Column({ nullable: true })
  media_count: number;

  @Column({ nullable: true })
  src_url: string

  @Column({ type: "simple-json", nullable: true })
  demographics: any;

  @Column({ type: "simple-json", nullable: true })
  geographics: any;

  @Column({ type: "simple-json", nullable: true })
  data_intervals: any;

  @OneToOne(() => User, (user) => user.yt_account  ,{ onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => YT_media, (YT_media) => YT_media.account, {
    onDelete: "CASCADE",
  })
  medias: YT_media[];

  @CreateDateColumn({select: false})
  created: Date;

  @UpdateDateColumn({select: false})
  updated: Date;
}
