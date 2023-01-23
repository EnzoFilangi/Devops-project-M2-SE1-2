import {Request, Response} from "express";

export function causeErrorFiveHundred(req: Request, res: Response) {
    res.sendStatus(500);
}