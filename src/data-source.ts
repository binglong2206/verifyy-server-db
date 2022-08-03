import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Account_stat } from "./entity/Account_stat";
import { FB_account } from "./entity/FB_account";
import { FB_media } from "./entity/FB_media";
import { IG_account } from "./entity/IG_account";
import { IG_media } from "./entity/IG_media";
import { YT_account } from "./entity/YT_account";
import { YT_media } from "./entity/YT_media";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Account_stat,
    FB_account,
    FB_media,
    IG_account,
    IG_media,
    YT_account,
    YT_media,
  ],
  migrations: [],
  subscribers: [],
});
