import { Response, Request, NextFunction } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken"; // .header.payload.hasedSignature(header + payload + secret)

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
    firstname: username,
  });

  if (!user) {
    const err = new Error();
    err.message = "username or password incorrect";
    return next(err);
  }

  // JWT sign tokens
  const session = { sessionId: 0, username: username };
  const accessToken = jwt.sign(
    { username: username },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1y" }
  );
  const refreshToken = jwt.sign(session, process.env.JWT_REFRESH_KEY, {
    expiresIn: "1y",
  });

  // Set cookie (name, value, headerOptions)
  res.cookie("accessToken", accessToken, {
    maxAge: 3.154e10,
    httpOnly: false,
    secure: isProduction, // Only request from HTTPS
    sameSite: isProduction,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: false,
    secure: isProduction, // Only request from HTTPS
    sameSite: isProduction,
  });

  // set cookie
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
}

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken, refreshToken } = req.body;
    if (!refreshToken) throw Error("no refresh token");
    if (accessToken) {
      const decodedUser = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      return res.send("accessToken still active");
    }
    if (refreshToken && !accessToken) {
      const session = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
      const accessToken = jwt.sign(
        { username: session["username"] },
        process.env.JWT_ACCESS_KEY,
        {
          expiresIn: "New accessToken",
        }
      );
      return res.send(accessToken);
    }
  } catch (e) {
    res.clearCookie("accessToken");
    const err = new Error();
    err.message = "Not Authorized, please login 77777";
    return next(err);
  }
}

export function logoutHandler(req: Request, res: Response, next: NextFunction) {
  // Clear cookies
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.send("logged out");
}
