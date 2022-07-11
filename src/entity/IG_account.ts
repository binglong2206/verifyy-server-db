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
import { IG_media } from "./IG_media";
import { User } from "./User";

@Entity()
export class IG_account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile_views: number;

  @Column()
  followers: number;

  @Column()
  like_count: number;

  @Column()
  impressions: number;

  @Column()
  reach: number;

  @Column()
  media_count: number;

  @Column({ type: "simple-json" })
  demographics: JSON;

  @Column({ type: "simple-json" })
  geographics: JSON;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => IG_media, (media) => media.account)
  medias: IG_media[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
