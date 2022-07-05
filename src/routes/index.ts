import express, { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { loginHandler } from "../utils/auth";

const router = express.Router();

interface reqBody {
  username: string;
  password: string;
}

router.post(
  "/login",
  // next Function is assigned automatically by app.use()
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await loginHandler(req, res, next); // req & res objects can be mutated out of scope;

    res.send(accessToken);
  }
);

export default router;
