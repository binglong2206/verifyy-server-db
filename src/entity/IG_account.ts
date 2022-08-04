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

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  profile_image: string

  @Column({ nullable: true })
  follower_count: number;

  @Column({ nullable: true })
  media_count: number;

  @Column({ nullable: true })
  src_url: string

  @Column({ type: "simple-json", nullable: true  })
  demographics: any;

  @Column({ type: "simple-json", nullable: true  })
  geographics: any;

  @Column({ type: "simple-json", nullable: true })
  data_intervals: any;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => IG_media, (media) => media.account) //{ cascade: ['insert', 'update'] }
  medias: IG_media[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
