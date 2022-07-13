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
  followers: number;

  @Column({ nullable: true })
  like_counts: number;

  @Column({ nullable: true })
  impressions: number;

  @Column({ nullable: true })
  engagements: number;

  @Column({ nullable: true })
  media_counts: number;

  @Column({ type: "simple-json", nullable: true })
  demographics: any;

  @Column({ type: "simple-json", nullable: true })
  geographics: any;

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
