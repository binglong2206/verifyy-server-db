import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { updateFB } from "../controller/updateFB";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Facebook API homepage");
});

router.post("/", updateFB);

export default router;
