import {NextFunction, Request, Response} from "express";

/**
 * This middleware has a 25% chance to return a code 500 and stop the call chain to simulate an occasionally broken backend
 * @param req
 * @param res
 * @param next
 */
export function occasionalFailSimulator(req: Request, res: Response, next: NextFunction){
    const failureProbability = 0.25;

    if (Math.random() > failureProbability){
        next();
    } else {
        res.sendStatus(500);
    }
}