import { NextFunction, Request, Response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";

interface AccessLoad {
  id: number;
  username: string;
}

// NextJS already verified refresh&access. Just do both again.
export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = cookie.parse(req.headers.cookie);
  const { accessToken, refreshToken } = cookies;

  const access = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET
  ) as AccessLoad;
  const session = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  console.log(access);
  res.locals.id = access.id;
  res.locals.username = access.username;

  next();
}
