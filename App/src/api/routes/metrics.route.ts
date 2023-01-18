import {Request, Response} from "express";
import register from "../../monitoring/register";

export async function metrics(req: Request, res: Response) {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
}