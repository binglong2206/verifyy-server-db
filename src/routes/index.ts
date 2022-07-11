import { errorMonitor } from "events";
import express, { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { loginHandler, logoutHandler } from "../utils/auth";
import { authenticateJWT } from "../middleware/authenticateJWT";
import showUsers from "../controller/showUsers";
import showData from "../controller/showData";
import { authorizationUrl } from "../google";
import beta_users from "../beta-users";

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
  res.send("homepage");
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
