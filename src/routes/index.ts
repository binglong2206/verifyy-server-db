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
router.use('/oauth', oauthRouter)
router.use("/dashboard", dashboardRouter); // auth only on private edit, not public
router.use("/youtube", youtubeRouter); // Social routers have custom auth middleware inside
router.use("/instagram", instagramRouter);
router.use("/facebook", facebookRouter);
router.use('/user', verifyCookieJWT, userRouter);
router.get('/checkUser/:username', checkUser);
router.post("/login", loginHandler);
router.post("/signup", signupHandler);
router.delete("/logout", logoutHandler);

// Test routes
router.get("/data/:id", showUserData);
router.get("/users", showUsers);




export default router;
