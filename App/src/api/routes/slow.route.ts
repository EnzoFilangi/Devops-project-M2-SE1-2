import {Request, Response} from "express";

export async function slow(req: Request, res: Response){
    await new Promise(_ => setTimeout(_, 2000));
    res.sendStatus(200);
}