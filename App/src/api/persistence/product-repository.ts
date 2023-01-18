import {ProductEntity} from "../entities/product.entity";

/**
 * An in-memory repository for the ProductEntity class
 */
export class ProductRepository {
    products: ProductEntity[] = [];

    getAllProducts(): ProductEntity[] {
        // Clone the array
        return this.products.map(product => product)
    }

    findProduct(id: string): ProductEntity {
        return this.products.find(product => product.id === id);
    }

    saveProduct(productToSave: ProductEntity): void {
        const productIndex = this.products.findIndex(product => product.id === productToSave.id);
        if (productIndex === -1){
            this.products.push(productToSave);
        } else {
            this.products[productIndex] = productToSave
        }
    }

    removeProduct(id: string): void {
        this.products = this.products.filter(product => product.id !== id);
    }
}