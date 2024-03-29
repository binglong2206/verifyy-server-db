import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Account_stat } from "../entity/Account_stat";
import { FB_account } from "../entity/FB_account";
import { FB_media } from "../entity/FB_media";
import { IG_account } from "../entity/IG_account";
import { IG_media } from "../entity/IG_media";
import { YT_account } from "../entity/YT_account";
import { YT_media } from "../entity/YT_media";
import { AppDataSource } from "../data-source";

export async function getDashboard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let username: string;
    let id: number;

    // if have params, means the request is for public dashbaord /:username
    if (req.params.username) {
      username = req.params.username
      const user = await User.findOne({
      where: {
            username: username
        }
      });

    // Check Slug
      if (!user) {
        console.error('USER NOT FOUND')
        return res.status(404).end();
      } else {
        console.log('USER FOUND')
      }
    } else {
      // if no params, means request is from /edit. Get username and id from verified cookie
      username = res.locals.username;
      id = res.locals.id
    }
    

    // const account_stat = await Account_stat.findOne({
    //   where: {
    //     user: {username: username}
    //   },
    //   relations: {
    //     user: true
    //   }
    // });

    const account_stat = await AppDataSource.getRepository(Account_stat)
      .createQueryBuilder('account_stat')
      .leftJoin('account_stat.user', 'user')
      .where('user.username = :username', {username: username})
      .select('user.id, user.username, user.email, follower_count, media_count, profile_image, background_image, charts_order')
      .getRawOne();


  

    // To refactor the code below to single User query and relations with the 3 accounts
    const yt_account = await YT_account.findOne({
      where: {
        user: {username: username}
      },
      relations: ['medias']
    });

    const ig_account = await IG_account.findOne({
      where: {
        user: {username: username}
      },
      relations: ['medias']
    })

    const fb_account = await FB_account.findOne({
      where: {
        user: {username: username}
      },
      relations: ['medias']
    })

    console.log("Sending dashboard data to client");
    return res.json({ // dont need to stringtify
      stat: account_stat,
      yt: yt_account,
      ig: ig_account,
      fb: fb_account
    });
  } catch (err) {
    next(err);
  }
}
