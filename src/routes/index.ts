import { errorMonitor } from "events";
import express, { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Account_stat } from "../entity/Account_stat";
import { FB_account } from "../entity/FB_account";
import { FB_media } from "../entity/FB_media";
import { IG_account } from "../entity/IG_account";
import { IG_media } from "../entity/IG_media";
import { YT_account } from "../entity/YT_account";
import { YT_media } from "../entity/YT_media";

import {
  loginHandler,
  signupHandler,
  logoutHandler,
} from "../middleware/authentication";
import { verifyCookieJWT, verifyHeaderJWT } from "../middleware/verifyJWT";
import showUsers from "../controller/showUsers";
import showUserData from "../controller/showUserData";
import { authorizationUrl } from "../google";
import beta_users from "../beta-users";
import { AppDataSource } from "../data-source";
import cookie from "cookie";
import { Tree } from "typeorm";
import youtubeRouter from "./youtube";
import instagramRouter from "./instagram";
import facebookRouter from "./facebook";
import dashboardRouter from "./dashboard";
import oauthRouter from './oauth'
import userRouter from './user'
import { checkUser } from "../middleware/checkUser";

const router = express.Router();

// next Function is automatically assigned by app.use()

// Only for beta cus' have pre-defined slugs, should be dynamic to when user create account in prod
router.get(
  "/checkslug/:slug",
  (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;

    if (!beta_users.find((e) => e.username === slug)) {
      res.json({
        redirect: {
          destination: "/404",
        },
      });
    }

    res.json({
      props: {
        id: slug,
        username: slug,
      },
    });
  }
);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // const newUser = new User();
  // newUser.firstname = "42";

  // const newFB = new FB_account();
  // newFB.like_counts = 777;
  // newFB.user = newUser;
  // newFB.demographics = { test1: "test1" };

  // AppDataSource.manager.save(newUser);
  // AppDataSource.manager.save(newFB);
  // console.log("done");
  res.send("homepage");
});
router.get("/json", async (req: Request, res: Response, next: NextFunction) => {
  const fb = await FB_account.find({
    relations: {
      user: true,
      medias: true,
    },
    where: {
      // foreign columns are just nested object in the parent entity
      user: {
        id: 41,
      },
    },
  });
  const demographics = fb[0].demographics;
  console.log(demographics["dog"]);
  res.send(fb);
});

router.get("/many", async (req: Request, res: Response, next: NextFunction) => {
  const fbaccount = await FB_account.findOne({
    where: {
      user: {
        id: 41,
      },
    },
  });
  const media1 = new FB_media();
  media1.like_count = 123;
  media1.account = fbaccount;

  AppDataSource.manager.save(media1);

  console.log("done");
  res.send("onetomany");
});

router.get(
  "/cookie",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers);

    // res.setHeader("Set-Cookie", [
    //   cookie.serialize("accessToken", "accessToken", {
    //     maxAge: 3.154e10,
    //     httpOnly: true,
    //     sameSite: true,
    //     secure: true,
    //     path: "/",
    //   }),
    //   cookie.serialize("refreshToken", "refreshToken", {
    //     maxAge: 3.154e10,
    //     httpOnly: true,
    //     sameSite: true,
    //     secure: true,
    //     path: "/",
    //   }),
    // ]);
    // console.log("cookie set");
    res.end();
  }
);


router.use('/oauth', oauthRouter)
router.use("/dashboard", verifyCookieJWT, dashboardRouter);
router.use("/youtube", youtubeRouter);
router.use("/instagram", instagramRouter);
router.use("/facebook", facebookRouter);
router.get('/checkUser/:username', checkUser);
router.use('/user', userRouter);


router.get("/data/:id", showUserData);
router.get("/users", showUsers);
router.post("/login", loginHandler);
router.post("/signup", signupHandler);
router.delete("/logout", logoutHandler);



export default router;
