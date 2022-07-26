import {Request, Response, NextFunction } from "express";
import { User } from "../entity/User";

export async function checkUser(req: Request, res: Response, next: NextFunction) {
    const username = req.params.username.toLowerCase();
    
    const user = await User.findOne({
        where: {
            username: username
        }
    });
  
    if (!user) {
      console.log('USER NOT FOUND')
      res.status(404).end();
    }


    res.end()
}