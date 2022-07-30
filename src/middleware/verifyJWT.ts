import { NextFunction, Request, Response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";

interface AccessLoad {
  id: number;
  username: string;
}

interface RefreshLoad {
  sessionId: number;
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

  // If refresh fails, then JWT error will be thrown to default error handler
  const session = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as RefreshLoad;
  
  // Set new accessToken if expired and refresh token still valid
  if (!accessToken) {
    const newToken = jwt.sign(
      { id: session.id, username: session.username},
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "30m" }
    );
    res.setHeader("Set-Cookie", 
      cookie.serialize("accessToken", newToken, {
        maxAge: 3000,
        httpOnly: true,
        sameSite: true,
        secure: true,
        path: "/",
      }));
    console.log('NEW ACCESS TOKEN GENERATED')
  } else {
    // if Access Token not expired, then verify normally 
    const access = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET) as AccessLoad;
  }

  // Quick check if jwt username match url params if :username param exist
  if (req.params.username) {
    if (req.params.username !== session.username) throw new Error('cookie valid but url param dont match');
  }

  res.locals.id = session.id;
  res.locals.username = session.username;
  console.log('VERIFY COOKIE DONE')

  res.json({result:'done'})
}

// NextJS already verified refresh&access. Just do both again.
export function verifyHeaderJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = cookie.parse(req.headers.authorization);
  const { web_accessToken, web_refreshToken } = auth;

  const access = jwt.verify(
    web_accessToken,
    process.env.JWT_ACCESS_SECRET
  ) as AccessLoad;
  const session = jwt.verify(web_refreshToken, process.env.JWT_REFRESH_SECRET);
  res.locals.id = access.id;
  res.locals.username = access.username;
  console.log('verify header DONE')
  next();
}
