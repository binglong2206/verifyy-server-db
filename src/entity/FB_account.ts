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
import { FB_media } from "./FB_media";
import { User } from "./User";

@Entity()
export class FB_account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ nullable: true })
  follower_count: number;

  @Column({ nullable: true })
  like_count: number;

  @Column({ nullable: true })
  media_count: number;

  @Column({ nullable: true })
  src_url: string;

  @Column({ type: "simple-json", nullable: true })
  demographics: any;

  @Column({ type: "simple-json", nullable: true })
  geographics: any;

  @Column({ type: "simple-json", nullable: true })
  data_intervals: any;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => FB_media, (FB_media) => FB_media.account)
  medias: FB_media[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
