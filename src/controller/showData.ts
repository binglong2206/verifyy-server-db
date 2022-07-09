import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export default async function showUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, username } = res.locals;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    res.send(`VERIFIED FOR ${user.username}`);
  } catch (err) {
    next(err);
  }
}
