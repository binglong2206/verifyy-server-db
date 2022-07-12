import { Response, Request, NextFunction } from "express";
import { User } from "../entity/User";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken"; // .header.payload.hasedSignature(header + payload + secret)
import cookie from "cookie";
import bcrypt from "bcrypt";
import { SimpleConsoleLogger } from "typeorm";
import { AppDataSource } from "../data-source";

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
  try {
    const { username, password } = req.body;
    // Verify username & password
    const user = await User.findOneBy({
      username: username,
    });
    if (!user) throw new Error("wrong username");

    const passwordCheck = await bcrypt.compare(password, user.hashed_password);

    if (!passwordCheck) throw Error("wrong password");

    // Sign JWT Token
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { sessionId: 0, id: user.id, username: user.username },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "60m" }
    );

    // Set Cookie
    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", accessToken, {
        maxAge: 3000,
        httpOnly: true,
        sameSite: true,
        secure: true,
        path: "/",
      }),
      cookie.serialize("refreshToken", refreshToken, {
        maxAge: 6000,
        httpOnly: true,
        sameSite: true,
        secure: true,
        path: "/",
      }),
    ]);

    res.end();
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function signupHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Assume form already validated
    const { firstname, username, password, email } = req.body;

    // Check if user already exist
    const user = await User.findOneBy({
      username: username,
    });
    if (user) throw Error("user already exist");

    // Add user & hashed password
    const newUser = new User();
    newUser.firstname = firstname;
    newUser.username = username;
    newUser.email = email;

    const hashed = bcrypt.hashSync(password, 10);
    if (!hashed) throw Error("something went wrong");
    newUser.hashed_password = hashed;

    await AppDataSource.manager.save(newUser);

    // Sign JWT Token
    const accessToken = jwt.sign(
      { id: newUser.uuid, username: newUser.username },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { sessionId: 0, id: newUser.uuid, username: newUser.username },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "60m" }
    );

    // Set Cookie
    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", accessToken, {
        maxAge: 3000,
        httpOnly: true,
        sameSite: true,
        secure: true,
        path: "/",
      }),
      cookie.serialize("refreshToken", refreshToken, {
        maxAge: 6000,
        httpOnly: true,
        sameSite: true,
        secure: true,
        path: "/",
      }),
    ]);

    res.end();
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export function logoutHandler(req: Request, res: Response, next: NextFunction) {
  // Clear cookies
  res.setHeader("Set-Cookie", [
    cookie.serialize("accessToken", "expired", {
      maxAge: 0,
    }),
    cookie.serialize("refreshToken", "expired", {
      maxAge: 0,
    }),
  ]);

  res.end();
}

// export function authenticateJWT(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { accessToken, refreshToken } = req.body;
//     if (!refreshToken) throw Error("no refresh token");
//     if (accessToken) {
//       const decodedUser = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
//       return res.send("accessToken still active");
//     }
//     if (refreshToken && !accessToken) {
//       const session = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
//       const accessToken = jwt.sign(
//         { username: session["username"] },
//         process.env.JWT_ACCESS_KEY,
//         {
//           expiresIn: "New accessToken",
//         }
//       );
//       return res.send(accessToken);
//     }
//   } catch (e) {
//     res.clearCookie("accessToken");
//     const err = new Error();
//     err.message = "Not Authorized, please login 77777";
//     return next(err);
//   }
// }
