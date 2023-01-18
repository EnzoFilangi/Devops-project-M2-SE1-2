import {ProductEntity} from "../../api/entities/product.entity";
import {ProductRepository} from "../../api/persistence/product-repository";

export class RepositoryFixture {
    static createRepository(...products: ProductEntity[]): ProductRepository {
        const repository = new ProductRepository();
        products.forEach(product => repository.saveProduct(product));
        return repository;
    }

    static createFilledRepository(size: number = 5){
        const products = [];
        for (let i = 0; i < size; i++){
            products.push(new ProductEntity("FooBar", 1, ["Foo", "Bar"]))
        }
        return {repository: this.createRepository(...products), products}
    }
}