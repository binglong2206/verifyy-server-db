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

    // Check if ig_account exist
    let ig_account = await IG_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!ig_account) {
      ig_account = new IG_account();
    }

    // Search all medias belonging to user and delete, repository is the real table itself
    const medias = await IG_media.findBy({
      account: {
        id: ig_account.id,
      },
    });

    const mediaRepository = AppDataSource.getRepository(IG_media);
    if (medias) mediaRepository.remove(medias);

    // Insert from req.body
    ig_account.username = req.body.username;
    ig_account.follower_count = req.body.follower_count;
    ig_account.media_count = req.body.media_count;
    ig_account.demographics = req.body.demographics; // no need to json stringify
    ig_account.geographics = req.body.geographics; // insert as object, but stored as json
    ig_account.user = await User.findOneBy({
      id: id,
    });

    ig_account.medias = req.body.medias.map(async (e) => {
      const ig_media = new IG_media(); // map & create multiple media entity in array
      ig_media.like_count = e.like_count;
      ig_media.comment_count = e.comments_count;
      ig_media.media_url = e.media_url;
      ig_media.src_url = e.permalink;
      ig_media.account = ig_account;
      await AppDataSource.manager.save(ig_media).then(() => {
        return ig_media;
      });
    });

    await AppDataSource.manager.save(ig_account);

    console.log("UPDATE IG DONE ", res.locals.id, res.locals.username);

    res.end();
  } catch (err) {
    next(err);
  }
}
