import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { getDashboard } from "../controller/getDashboard";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Dashboard API homepage");
});

router.get("/:id", getDashboard);

export default router;
