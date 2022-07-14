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

export async function updateYT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, username } = res.locals;

    // Check if yt_account exist
    let yt_account = await YT_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!yt_account) {
      yt_account = new YT_account();
    }

    yt_account.subscriber_count = req.body.subscriber_count;
    yt_account.view_count = req.body.view_count;
    yt_account.upload_count = req.body.upload_count;
    yt_account.demographics = req.body.demographics; // no need to jason stringify
    yt_account.geographics = req.body.geographics; // insert as object, but stored as json
    yt_account.user = await User.findOneBy({
      id: id,
    });

    await AppDataSource.manager.save(yt_account);

    console.log("Authorization: ", res.locals.id, res.locals.username);

    res.end();
  } catch (err) {
    next(err);
  }
}
