import { NextFunction, Request, Response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";

interface AccessLoad {
  id: number;
  username: string;
}

// NextJS already verified refresh&access. Just do both again.
export function verifyCookieJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = cookie.parse(req.headers.cookie);
  const { accessToken, refreshToken } = cookies;

  // jwt.verify will auto throw error to next(err) if fail
  const access = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET
  ) as AccessLoad;
  const session = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  res.locals.id = access.id;
  res.locals.username = access.username;

  next();
}

// NextJS already verified refresh&access. Just do both again.
export function verifyHeaderJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = JSON.parse(req.headers.authorization);
  const { web_accessToken, web_refreshToken } = auth;

  const access = jwt.verify(
    web_accessToken,
    process.env.JWT_ACCESS_SECRET
  ) as AccessLoad;
  const session = jwt.verify(web_refreshToken, process.env.JWT_REFRESH_SECRET);
  res.locals.id = access.id;
  res.locals.username = access.username;
  console.log("verify done");
  next();
}
