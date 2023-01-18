import {RepositoryFixture} from "../utils/repository-fixture";
import {RequestFixture} from "../utils/request-fixture";
import {Response} from "express";
import {ResponseMock} from "../utils/response-mock";
import {ProductEntity} from "../../api/entities/product.entity";
import {addProduct} from "../../api/routes/add-product.route";

describe("Add product route", () => {
    let responseMock: Response;
    let sendStatusSpy: jest.SpyInstance;

    beforeEach(() => {
        responseMock = new ResponseMock() as unknown as Response;
        sendStatusSpy = jest.spyOn(responseMock, "sendStatus");
    })

    it("Should add the given product an empty repository", () => {
        const repository = RepositoryFixture.createRepository();
        const product = new ProductEntity("FooBar", 1, ["Foo", "Bar"]);

        addProduct(RequestFixture.getRequestWithProductBodyFromProductEntity(product), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(200);
        expect(repository.products.length).toEqual(1);
        expect(repository.products[0].name).toEqual(product.name);
        expect(repository.products[0].price).toEqual(product.price);
        expect(repository.products[0].categories).toEqual(product.categories);
    });

    it("Should add the given product to an existing repository", () => {
        const {repository} = RepositoryFixture.createFilledRepository(5);
        const product = new ProductEntity("FooBar", 1, ["Foo", "Bar"]);

        addProduct(RequestFixture.getRequestWithProductBodyFromProductEntity(product), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(200);
        expect(repository.products.length).toEqual(6);
        expect(repository.products.at(-1).name).toEqual(product.name);
        expect(repository.products.at(-1).price).toEqual(product.price);
        expect(repository.products.at(-1).categories).toEqual(product.categories);
    });

    it("Should refuse to add a product without a name", () => {
        const repository = RepositoryFixture.createRepository();

        addProduct(RequestFixture.getRequestWithProductBody(undefined, 1, ["Foo", "Bar"]), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
        expect(repository.products.length).toEqual(0);
    });

    it("Should refuse to add a product with an invalid name", () => {
        const repository = RepositoryFixture.createRepository();

        // @ts-ignore
        addProduct(RequestFixture.getRequestWithProductBody(1, 1, ["Foo", "Bar"]), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
        expect(repository.products.length).toEqual(0);
    });

    it("Should refuse to add a product without a price", () => {
        const repository = RepositoryFixture.createRepository();

        addProduct(RequestFixture.getRequestWithProductBody("FooBar", undefined, ["Foo", "Bar"]), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
        expect(repository.products.length).toEqual(0);
    });

    it("Should refuse to add a product with an invalid price", () => {
        const repository = RepositoryFixture.createRepository();

        // @ts-ignore
        addProduct(RequestFixture.getRequestWithProductBody("FooBar", "", ["Foo", "Bar"]), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
        expect(repository.products.length).toEqual(0);
    });

    it("Should refuse to add a product without categories", () => {
        const repository = RepositoryFixture.createRepository();

        addProduct(RequestFixture.getRequestWithProductBody("FooBar", 1, undefined), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
        expect(repository.products.length).toEqual(0);
    });

    it("Should refuse to add a product with an empty categories list", () => {
        const repository = RepositoryFixture.createRepository();

        addProduct(RequestFixture.getRequestWithProductBody("FooBar", 1, []), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
        expect(repository.products.length).toEqual(0);
    });

    it("Should refuse to add a product with a categories list that doesn't contain strings", () => {
        const repository = RepositoryFixture.createRepository();

        //@ts-ignore
        addProduct(RequestFixture.getRequestWithProductBody("FooBar", 1, [1]), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
        expect(repository.products.length).toEqual(0);
    });
})