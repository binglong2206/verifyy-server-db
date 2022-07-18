import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { updateIG } from "../controller/updateIG";
import aggregateStat from "../controller/aggregateStat";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Instagram API homepage");
});

router.post("/", updateIG, aggregateStat);

export default router;
