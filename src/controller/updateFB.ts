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
import { parseDemoFB } from "../utils/parseDemo";
import { parseGeoFB } from "../utils/parseGeo";


export async function updateFB(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, username } = res.locals; // id & username saved as locals by JWT middleware

    // Check if ig_account exist
    let fb_account = await FB_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!fb_account) {
      fb_account = new FB_account();
      await AppDataSource.manager.save(fb_account); // Save here so media entity can assign to it
    }

    // Search all medias belonging to user and delete, repository is the real table itself
    const medias = await FB_media.findBy({
      account: {
        id: fb_account.id,
      },
    });

    const mediaRepository = AppDataSource.getRepository(FB_media);
    if (medias) mediaRepository.remove(medias);

    // Insert from req.body
    fb_account.follower_count = req.body.follower_count;
    fb_account.like_count = req.body.like_count;
    fb_account.media_count = req.body.media_count;
    fb_account.demographics = parseDemoFB(req.body.demographics); // no need to json stringify
    fb_account.geographics = parseGeoFB(req.body.geographics); // insert as object, but stored as json
    fb_account.data_intervals = req.body.data_intervals;
    fb_account.user = await User.findOneBy({
      id: id,
    });

    fb_account.medias = req.body.medias.map(async (e) => {
      const fb_media = new FB_media(); // map & create multiple media entity in array
      fb_media.like_count = e.like_count;
      fb_media.comment_count = e.comment_count;
      fb_media.thumbnail = e.media_url;
      fb_media.src_url = e.src_url;
      fb_media.impression_count = e.impression_count;
      fb_media.account = fb_account;
      await AppDataSource.manager.save(fb_media).then(() => {
        return fb_media;
      });
    });

    await AppDataSource.manager.save(fb_account);

    console.log("UPDATE FB DONE ", res.locals.id, res.locals.username);

    next()
  } catch (err) {
    next(err);
  }
}
