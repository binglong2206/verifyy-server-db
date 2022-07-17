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
  subscriber_count: number;

  @Column({ nullable: true })
  view_count: number;

  @Column({ nullable: true })
  upload_count: number;

  @Column({ type: "simple-json", nullable: true })
  demographics: any;

  @Column({ type: "simple-json", nullable: true })
  geographics: any;

  @OneToOne(() => User, { onDelete: "CASCADE" })
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
