import {Request, Response} from "express";
import {ProductRepository} from "../persistence/product-repository";
import {validate} from "uuid";

export function deleteProduct(req: Request, res: Response, repository: ProductRepository) {
    const productId = req.params["productId"];
    if (!productId || !validate(productId)) {
        res.sendStatus(400);
        return;
    }

    repository.removeProduct(productId);

    res.sendStatus(200);
}