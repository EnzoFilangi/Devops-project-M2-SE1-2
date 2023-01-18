import {Request, Response} from "express";
import {ProductRepository} from "../persistence/product-repository";
import {ProductEntity} from "../entities/product.entity";
import {validate} from "uuid";

export function updateProduct(req: Request, res: Response, repository: ProductRepository) {
    const productId = req.params["productId"];
    if (!productId || !validate(productId)) {
        res.sendStatus(400);
        return;
    }

    const productName = req.body["name"];
    const productPrice = req.body["price"];
    const categories = req.body["categories"];
    if (!productName || typeof productName !== "string"
        || !productPrice || typeof productPrice !== "number"
        || !categories || !Array.isArray(categories) || typeof categories[0] !== "string"){
        res.sendStatus(400);
        return;
    }

    const productToUpdate = new ProductEntity(productName, productPrice, categories);
    productToUpdate.id = productId
    repository.saveProduct(productToUpdate);

    res.sendStatus(200);
}