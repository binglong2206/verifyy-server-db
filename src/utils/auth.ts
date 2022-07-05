import { Response, Request, NextFunction } from "express";
import { User } from "../entity/User";
import { nextTick } from "process";
import { signJWT, verifyJWT } from "./jwt";

const isProduction = process.env.NODE_ENV === "production";

interface ReqBody {
  username: string;
  password: string;
}

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Find User
  const { username, password }: ReqBody = req.body;
  const user = await User.findOneBy({
    firstName: username,
  });
  if (!user) {
    const err = new Error();
    err.message = "username or password incorrect";
    return next(err);
  }

  // Sign payload, key, options
  const accessToken = signJWT(username, "1h");

  // Set cookie (name, value, headerOptions)
  res.cookie("accessToken", accessToken, {
    maxAge: 200000,
    httpOnly: true,
    secure: isProduction, // Only request from HTTPS
    sameSite: isProduction,
  });

  return accessToken; // Dont think have to return here
}

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { accessToken } = req.cookies;
}
