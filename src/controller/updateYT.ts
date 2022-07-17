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
import { appendFile } from "fs";

export async function updateYT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, username } = res.locals; // id & username saved as locals by JWT middleware

    // Check if yt_account exist
    let yt_account = await YT_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!yt_account) {
      yt_account = new YT_account();
      await AppDataSource.manager.save(yt_account); // Save here so media entity can assign to it

    }

    // Search all medias belonging to user and delete, repository is the real table itself
    const medias = await YT_media.findBy({
      account: {
        id: yt_account.id,
      },
    });

    const mediaRepository = AppDataSource.getRepository(YT_media);
    if (medias) mediaRepository.remove(medias);

    // Insert from req.body
    yt_account.subscriber_count = req.body.subscriber_count;
    yt_account.view_count = req.body.view_count;
    yt_account.upload_count = req.body.upload_count;
    yt_account.demographics = req.body.demographics; // no need to json stringify
    yt_account.geographics = req.body.geographics; // insert as object, but stored as json
    yt_account.user = await User.findOneBy({
      id: id,
    });
    yt_account.medias = req.body.medias.map(async (e) => {
      const yt_media = new YT_media(); // map & create multiple media entity in array
      yt_media.title = e.title;
      yt_media.view_count = e.view_count;
      yt_media.like_count = e.like_count;
      yt_media.comment_count = e.comment_count;
      yt_media.account = yt_account;
      console.log(yt_account)
      await AppDataSource.manager.save(yt_media);
    });

    await AppDataSource.manager.save(yt_account);

    console.log("UPDATE YOUTUBE DONE ", res.locals.id, res.locals.username);

    res.end();
  } catch (err) {
    next(err);
  }
}
