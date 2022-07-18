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
    const userId = parseInt(req.params.id);

    const account_stat = await Account_stat.findOne({
      where: {
        user: {id: userId}
      }
    })

    const yt_account = await YT_account.findOne({
      where: {
        user: {id: userId}
      },
      relations: ['medias']
    });

    const ig_account = await IG_account.findOne({
      where: {
        user: {id: userId}
      },
      relations: ['medias']
    })

    const fb_account = await FB_account.findOne({
      where: {
        user: {id: userId}
      },
      relations: ['medias']
    })

    console.log("ready to send data to dashboard");

    res.json({ // dont need to stringtify
      stat: account_stat,
      yt: yt_account,
      ig: ig_account,
      fb: fb_account
    });
  } catch (err) {
    next(err);
  }
}
