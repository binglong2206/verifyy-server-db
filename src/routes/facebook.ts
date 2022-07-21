import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { updateFB } from "../controller/updateFB";
import aggregateStat from "../controller/aggregateStat";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log(req.baseUrl)
  res.send("Facebook API homepage");
});

router.post("/", updateFB, aggregateStat);

export default router;
