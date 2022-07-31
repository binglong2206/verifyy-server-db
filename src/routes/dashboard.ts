import express, { NextFunction, Request, Response } from "express";
import { verifyCookieJWT, verifyHeaderJWT } from "../middleware/verifyJWT";
import { getDashboard } from "../controller/getDashboard";
import { checkUser } from "../middleware/checkUser";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Dashboard API homepage");
});


router.get("/edit", verifyCookieJWT, getDashboard);
router.get("/:username", getDashboard);



export default router;
