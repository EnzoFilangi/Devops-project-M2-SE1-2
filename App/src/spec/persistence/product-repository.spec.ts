import {ProductEntity} from "../../api/entities/product.entity";
import {ProductRepository} from "../../api/persistence/product-repository";

function createProductEntity(name: string = "Wooden fork", price: number = 1, categories: string[] = ["Food", "Wood"]): ProductEntity {
    return new ProductEntity(name, price, categories);
}

describe("Product Entity Repository", () => {
    let repository: ProductRepository;

    beforeEach(() => {
        repository = new ProductRepository();
    })

    it("Should save products", () => {
        const newProduct = createProductEntity();
        repository.saveProduct(newProduct);

        expect(repository.products.length).toEqual(1);
        expect(repository.products[0]).toEqual(newProduct);
    })

    it("Should save 10000 products at maximum", () => {
        for (let i = 0; i < 11000; i++){
            repository.saveProduct(createProductEntity());
        }

        expect(repository.products.length).toEqual(10000);
    })

    it("Should return all products", () => {
        const products = [createProductEntity(), createProductEntity(), createProductEntity()];
        repository.products = products;

        expect(repository.getAllProducts().length).toEqual(3);
        expect(repository.getAllProducts()).toEqual(products);
    })

    it("Should save multiple products", () => {
        const newProduct1 = createProductEntity();
        const newProduct2 = createProductEntity();
        const newProduct3 = createProductEntity();
        repository.saveProduct(newProduct1);
        repository.saveProduct(newProduct2);
        repository.saveProduct(newProduct3);

        expect(repository.products.length).toEqual(3);
        expect(repository.products[0]).toEqual(newProduct1);
        expect(repository.products[1]).toEqual(newProduct2);
        expect(repository.products[2]).toEqual(newProduct3);
    })

    it("Should get the right product given its id", function () {
        const newProduct1 = createProductEntity();
        const newProduct2 = createProductEntity();
        const newProduct3 = createProductEntity();
        repository.products = [newProduct1, newProduct2, newProduct3];

        const productFromRepository = repository.findProduct(newProduct1.id);
        expect(productFromRepository).not.toBeUndefined();
        expect(productFromRepository).toEqual(newProduct1);
    });

    it("findProduct should return undefined if no product with the given id exists", function () {
        const newProduct = createProductEntity();

        const productFromRepository = repository.findProduct(newProduct.id);
        expect(productFromRepository).toBeUndefined();
    });

    it("Saving an existing product should update it", () => {
        const newProduct = createProductEntity();
        repository.saveProduct(newProduct);

        const updatedProduct = new ProductEntity("Wooden knife", 2, []);
        updatedProduct.id = newProduct.id;
        repository.saveProduct(updatedProduct);

        expect(repository.products.length).toEqual(1);
        expect(repository.products[0]).not.toEqual(newProduct);
        expect(repository.products[0].id).toEqual(newProduct.id);
        expect(repository.products[0]).toEqual(updatedProduct);
    })

    it("Should remove products", () => {
        const newProduct = createProductEntity();
        repository.saveProduct(newProduct);
        repository.removeProduct(newProduct.id);

        expect(repository.products.length).toEqual(0);
    })
})