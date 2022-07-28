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
import { parseDemoIG } from "../utils/parseDemo";
import { parseGeoIG } from "../utils/parseGeo";
import timestamp from 'unix-timestamp';



export async function updateProfileImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
   const {id, username, url} = res.locals;
   const user = await User.findOne({
    where: {
        id: id
    }
   });

   user.profile_image = url;

   await AppDataSource.manager.save(user).then(()=> {
    console.log('profile upload done');
    res.end();
   })

} catch (err) {
    next(err);
  }
};


export async function updateBackgroundImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
     const {id, username, url} = res.locals;
     const user = await User.findOne({
      where: {
          id: id
      }
     });
  
     user.background_image = url;
  
     await AppDataSource.manager.save(user).then(()=> {
        console.log('background upload done');
        res.end();
     })
     
  } catch (err) {
      next(err);
    }
  }
