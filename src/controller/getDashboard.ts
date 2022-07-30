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
    const username = req.params.username;

    const user = await User.findOne({
      where: {
          username: username
      }
  });

  if (!user) {
    console.error('USER NOT FOUND')
    return res.status(404).end();
  } else {
    console.log('USER FOUND')
  }

    const account_stat = await Account_stat.findOne({
      where: {
        user: {username: username}
      }
    });

  
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
