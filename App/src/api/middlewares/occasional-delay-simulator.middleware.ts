import {NextFunction, Request, Response} from "express";

/**
 * This middleware has a 5% chance to add a 2s delay to the call chain to simulate an occasionally slow backend
 * @param req
 * @param res
 * @param next
 */
export async function occasionalDelaySimulator(req: Request, res: Response, next: NextFunction){
    const delayProbability = 0.05;

    if (Math.random() < delayProbability){
        await new Promise(_ => setTimeout(_, 2000));
    }

    next();
}