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
import { parseDemoYT } from "../utils/parseDemo";
import { parseGeoYT } from "../utils/parseGeo";
import { parseDemoIG } from "../utils/parseDemo";
import { parseGeoIG } from "../utils/parseGeo";


export async function loadSampleData(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const insertIGMedia = async (ig_account) => {
    let medias = [];
    for (let i = 0; i < 5; i++){
      const ig_media = new IG_media(); // map & create multiple media entity in array
      ig_media.like_count = null
      ig_media.comment_count = null
      ig_media.thumbnail = null
      ig_media.src_url = null
      ig_media.account = ig_account // This is null cus' account hasnt been saved yet
      await AppDataSource.manager.save(ig_media).then(() => {
        medias.push(ig_media)
      });
    };
    return medias 
  }

  const insertYTMedia = async (yt_account) => {
    let medias = [];
    for (let i = 0; i < 5; i++){
      const yt_media = new YT_media(); // map & create multiple media entity in array
      yt_media.title = null
      yt_media.view_count = null
      yt_media.like_count = null
      yt_media.comment_count = null
      yt_media.account = yt_account;
      await AppDataSource.manager.save(yt_media);
    };
    return medias 
  }

  const insertFBMedia = async (fb_account) => {
    let medias = [];
    for (let i = 0; i < 5; i++){
      const fb_media = new FB_media(); // map & create multiple media entity in array
      fb_media.like_count = null
      fb_media.comment_count = null
      fb_media.thumbnail = null
      fb_media.src_url = null
      fb_media.impression_count = null
      fb_media.account = fb_account
      await AppDataSource.manager.save(fb_media).then(() => {
        return fb_media;
      });
    };
    return medias 
  }


  try {
    const { id, username } = res.locals; // id & username saved as locals by JWT middleware

    // Check if fb_account exist
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
    fb_account.follower_count = 77
    fb_account.like_count = null
    fb_account.media_count = null
    fb_account.demographics = null // no need to json stringify
    fb_account.geographics = null// insert as object, but stored as json
    fb_account.data_intervals = null
    fb_account.user = await User.findOneBy({
      id: id,
    });

    fb_account.medias = await insertFBMedia(fb_account)

    const seededFacebook = await AppDataSource.manager.save(fb_account);

    
     // Check if ig_account exist
     let ig_account = await IG_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!ig_account) {
      ig_account = new IG_account();
      await AppDataSource.manager.save(ig_account); // Save here so media entity can assign to it
    }

    // Search all medias belonging to user and delete, repository is the real table itself
    const IGmedias = await IG_media.findBy({
      account: {
        id: ig_account.id,
      },
    });

    const IGmediaRepository = AppDataSource.getRepository(IG_media);
    if (IGmedias) IGmediaRepository.remove(IGmedias);

    // Insert from req.body
    ig_account.username = null
    ig_account.follower_count = 77
    ig_account.media_count = null
    ig_account.demographics = null // no need to json stringify
    ig_account.geographics = null// insert as object, but stored as json
    ig_account.data_intervals = null
    ig_account.user = await User.findOneBy({
      id: id,
    });


    ig_account.medias = await insertIGMedia(ig_account)
  

    const seededInstagram = await AppDataSource.manager.save(ig_account);
    
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
    const YTmedias = await YT_media.findBy({
      account: {
        id: yt_account.id,
      },
    });

    const YTmediaRepository = AppDataSource.getRepository(YT_media);
    if (YTmedias) YTmediaRepository.remove(YTmedias);

    // Insert from req.body
    yt_account.follower_count = 77
    yt_account.view_count = null
    yt_account.media_count = null
    yt_account.demographics = null; // no need to json stringify
    yt_account.geographics = null // insert as object, but stored as json
    yt_account.data_intervals = null
    yt_account.user = await User.findOneBy({
      id: id,
    });
    yt_account.medias = await insertYTMedia(yt_account)

    const seededYoutube = await AppDataSource.manager.save(yt_account);

    console.log('SAMPLE DATA LOADED');

    next() // Next to aggregate stats
  } catch (err) {
    next(err);
  }
}
