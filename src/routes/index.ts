import express, { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { authenticateJWT, loginHandler, logoutHandler } from "../utils/auth";

const router = express.Router();

interface reqBody {
  username: string;
  password: string;
}

// next Function is assigned automatically by app.use()
router.post("/login", loginHandler);

router.post("/restricted", authenticateJWT);

router.delete("/logout", logoutHandler);

export default router;
