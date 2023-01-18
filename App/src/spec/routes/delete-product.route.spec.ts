import {ResponseMock} from "../utils/response-mock";
import {RepositoryFixture} from "../utils/repository-fixture";
import {RequestFixture} from "../utils/request-fixture";
import {Response} from "express";
import {deleteProduct} from "../../api/routes/delete-product.route";
import {v4 as uuidV4} from "uuid";

describe("Delete product route", () => {
    let responseMock : Response;
    let sendStatusSpy : jest.SpyInstance;

    beforeEach(() => {
        responseMock = new ResponseMock() as unknown as Response;
        sendStatusSpy = jest.spyOn(responseMock, "sendStatus");
    })

    it("Should delete the product from the repository", () => {
        const {repository, products} = RepositoryFixture.createFilledRepository(1);

        deleteProduct(RequestFixture.getRequestWithProductIdParam(products[0].id), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(200);
        expect(repository.products.length).toEqual(0);
    })

    it("Should return 200 even if the product doesn't exist", () => {
        const repository = RepositoryFixture.createRepository();

        deleteProduct(RequestFixture.getRequestWithProductIdParam(uuidV4()), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(200);
        expect(repository.products.length).toEqual(0);
    })

    it("Should return 400 if no product id is supplied", () => {
        const repository = RepositoryFixture.createRepository();

        deleteProduct(RequestFixture.getRequestWithProductIdParam(undefined), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
    })

    it("Should return 400 if invalid id is supplied", () => {
        const repository = RepositoryFixture.createRepository();

        deleteProduct(RequestFixture.getRequestWithProductIdParam("not a uuid"), responseMock, repository);

        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
    })
})