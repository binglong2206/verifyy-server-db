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

  @Column()
  demographics: JSON;

  @Column()
  geographics: JSON;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user_id: User;

  @OneToMany(() => IG_media, (media) => media.account_id)
  medias: IG_media[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
