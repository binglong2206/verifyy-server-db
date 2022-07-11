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

import { loginHandler, logoutHandler } from "../utils/auth";
import { authenticateJWT } from "../middleware/authenticateJWT";
import showUsers from "../controller/showUsers";
import showData from "../controller/showData";
import { authorizationUrl } from "../google";
import beta_users from "../beta-users";
import { AppDataSource } from "../data-source";

const router = express.Router();

// next Function is automatically assigned by app.use()

router.post("/fb", (req: Request, res: Response, next: NextFunction) => {
  console.log("json received");
  console.log(req.body.business_discovery.media.data);
  res.status(200).end();
});

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
  const newUser = new User();
  newUser.firstname = "42";

  const newFB = new FB_account();
  newFB.like_counts = 777;
  newFB.user = newUser;
  newFB.demographics = { test1: "test1" };

  AppDataSource.manager.save(newUser);
  AppDataSource.manager.save(newFB);
  console.log("done");

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

router.get("/data", authenticateJWT, showData);

router.get("/users", showUsers);

router.post("/login", loginHandler);

router.get("/restricted", authenticateJWT);

router.delete("/logout", logoutHandler);

router.get("/google", (req: Request, res: Response, next: NextFunction) => {
  res.redirect(authorizationUrl);
});

export default router;
