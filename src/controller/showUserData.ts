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

export default async function showUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    console.log('USER ID', userId)

    const user = await User.findOne({
      where: {
        id: userId
      },
      relations: ['yt_account', 'ig_account', 'fb_account']
      
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

    
    const sum = await AppDataSource.getRepository(User) // Access to real db table
        .createQueryBuilder("user") // Init query
        .where('user.id = :id', {id: 2}) // Condition
        .leftJoin('user.yt_account', 'yt') // Relations
        .leftJoin('user.ig_account', 'ig') 
        .leftJoin('user.fb_account', 'fb') 
        .select('COALESCE(SUM(COALESCE(yt.follower_count) + COALESCE(ig.follower_count) + COALESCE(fb.follower_count,0)),0)', 'follower_sum') // Operation
        .getRawOne();

        console.log(sum)



    res.json({
      user: user,
      // yt: yt_account,
      // ig: ig_account,
      // fb: fb_account
    });
  } catch (err) {
    next(err);
  }
}
