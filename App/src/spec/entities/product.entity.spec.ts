import {ProductEntity} from "../../api/entities/product.entity";
import {validate, version} from 'uuid';

describe("Product entity", () => {
    it("Should auto generate a uuid V4", () => {
        const product = new ProductEntity("Biodegradable glitter", 1.50, ["Fun", "Decoration"])

        expect(validate(product.id)).toBeTruthy();
        expect(version(product.id)).toEqual(4);
    })
})