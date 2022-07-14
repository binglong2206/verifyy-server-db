import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Account_stat } from "../entity/Account_stat";
import { FB_account } from "../entity/FB_account";
import { FB_media } from "../entity/FB_media";
import { IG_account } from "../entity/IG_account";
import { IG_media } from "../entity/IG_media";
import { YT_account } from "../entity/YT_account";
import { YT_media } from "../entity/YT_media";

export async function updateIG(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reqBody = req.body;
    console.log("DATA RECEIVED: ", reqBody);
    console.log("INSTGAGRAM GOOD: ", res.locals.id, res.locals.username);

    res.end();
  } catch (err) {
    next(err);
  }
}
