import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  OneToOne,
} from "typeorm";
import { FB_account } from "./FB_account";
import { YT_account } from "./YT_account";
import { IG_account } from "./IG_account";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstname: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  hashed_password: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({nullable: true })
  profile_image: string;

  @Column({nullable: true })
  background_image: string;

  @OneToOne(() => YT_account, (yt_account) => yt_account.user)
  yt_account: YT_account

  @OneToOne(() => IG_account, (yt_account) => yt_account.user)
  ig_account: IG_account

  @OneToOne(() => FB_account, (yt_account) => yt_account.user)
  fb_account: FB_account

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
