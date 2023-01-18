import {Request, Response} from "express";

export function helloWorld(req: Request, res: Response){
    res.json({
        message: "Hello, world !"
    })
}