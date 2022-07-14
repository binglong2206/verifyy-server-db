import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { updateYT } from "../controller/updateYT";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Youtube API homepage");
});

router.post("/", updateYT);

export default router;
