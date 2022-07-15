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

export async function updateIG(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, username } = res.locals; // id & username saved as locals by JWT middleware

    // Check if yt_account exist
    let ig_account = await IG_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!ig_account) {
      ig_account = new IG_account();
    }

    ig_account.username = req.body.username;
    ig_account.follower_count = req.body.follower_count;
    ig_account.media_count = req.body.media_count;
    ig_account.demographics = req.body.demographics; // no need to json stringify
    ig_account.geographics = req.body.geographics; // insert as object, but stored as json
    ig_account.user = await User.findOneBy({
      id: id,
    });

    await AppDataSource.manager.save(ig_account);

    console.log("Authorization: ", res.locals.id, res.locals.username);

    res.end();
  } catch (err) {
    next(err);
  }
}
