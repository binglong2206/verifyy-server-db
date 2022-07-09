import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export default async function showUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
}
