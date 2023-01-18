import {Request, Response} from "express";
import {ProductRepository} from "../persistence/product-repository";

export function getAllProducts(req: Request, res: Response, repository: ProductRepository) {
    res.json({
        products: repository.getAllProducts()
    });
}