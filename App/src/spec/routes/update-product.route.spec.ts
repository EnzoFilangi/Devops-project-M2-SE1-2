import {ResponseMock} from "../utils/response-mock";
import {RepositoryFixture} from "../utils/repository-fixture";
import {RequestFixture} from "../utils/request-fixture";
import {Response} from "express";
import {updateProduct} from "../../api/routes/update-product.route";
import {ProductEntity} from "../../api/entities/product.entity";

describe("Update product route", () => {
    let responseMock : Response;
    let sendStatusSpy : jest.SpyInstance;

    beforeEach(() => {
        responseMock = new ResponseMock() as unknown as Response;
        sendStatusSpy = jest.spyOn(responseMock, "sendStatus");
    })

    it("Should update the right product if it exists", () => {
        const {repository, products} = RepositoryFixture.createFilledRepository(1);
        const editedProduct = new ProductEntity("Bamboo", 10, ["Nature"]);
        editedProduct.id = products[0].id;

        updateProduct(RequestFixture.getRequestWithBodyAndParamsFromProductEntity(editedProduct), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(200);
        expect(repository.products[0].name).toEqual("Bamboo")
        expect(repository.products[0].price).toEqual(10)
        expect(repository.products[0].categories).toEqual(["Nature"])
    })

    it("Should add the product if it doesn't exist", () => {
        const repository = RepositoryFixture.createRepository();
        const editedProduct = new ProductEntity("Bamboo", 10, ["Nature"]);

        updateProduct(RequestFixture.getRequestWithBodyAndParamsFromProductEntity(editedProduct), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(200);
        expect(repository.products[0].name).toEqual("Bamboo")
        expect(repository.products[0].price).toEqual(10)
        expect(repository.products[0].categories).toEqual(["Nature"])
    })

    it("Should return 400 if the id isn't present", () => {
        const {repository, products} = RepositoryFixture.createFilledRepository(1);

        updateProduct(RequestFixture.getRequestWithProductBodyFromProductEntity(products[0]), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
    })
})