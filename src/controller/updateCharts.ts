import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Account_stat } from "../entity/Account_stat";
import { AppDataSource } from "../data-source";


export async function patchChart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const chartId = parseInt(req.params.chartId)
    const {id, username} = res.locals;

    const account = await Account_stat.findOne({
        where: {
            user: {
                id: id
            }
        }
    });

    account.charts_order.push(chartId);

    await AppDataSource.manager.save(account).then(r => res.end())
    
  } catch (err) {
    next(err);
  }
}


export async function deleteChart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        const chartId = parseInt(req.params.chartId)
        const {id, username} = res.locals;
    
        const account = await Account_stat.findOne({
            where: {
                user: {
                    id: id
                }
            }
        });
    
        account.charts_order.splice(account.charts_order.indexOf(chartId), 1)
    
        await AppDataSource.manager.save(account).then(r => res.end())
        
      } catch (err) {
        next(err);
      }
  }
  