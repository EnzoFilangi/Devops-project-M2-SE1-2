import {Request, Response} from "express";
import {ProductRepository} from "../persistence/product-repository";
import {validate} from "uuid";

export function getProduct(req: Request, res: Response, repository: ProductRepository) {
    const productId = req.params["productId"];
    if (!productId || !validate(productId)) {
        res.sendStatus(400);
        return;
    }

    const product = repository.findProduct(productId);
    if (!product){
        res.sendStatus(404);
        return;
    }

    res.json(product);
}