import {Request, Response} from "express";
import {ProductRepository} from "../persistence/product-repository";
import {ProductEntity} from "../entities/product.entity";

export function addProduct(req: Request, res: Response, repository: ProductRepository) {
    const productName = req.body["name"];
    const productPrice = req.body["price"];
    const categories = req.body["categories"];
    if (!productName || typeof productName !== "string"
    || !productPrice || typeof productPrice !== "number"
    || !categories || !Array.isArray(categories) || typeof categories[0] !== "string"){
        res.sendStatus(400);
        return;
    }

    const newProduct = new ProductEntity(productName, productPrice, categories);
    repository.saveProduct(newProduct);
    res.sendStatus(200);
}