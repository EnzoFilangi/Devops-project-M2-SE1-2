import {ResponseMock} from "../utils/response-mock";
import {RepositoryFixture} from "../utils/repository-fixture";
import {getProduct} from "../../api/routes/get-product.route";
import {RequestFixture} from "../utils/request-fixture";
import {Response} from "express";
import {v4 as uuidV4} from "uuid";

describe("Get product route", () => {
    let responseMock : Response;
    let sendStatusSpy : jest.SpyInstance;
    let jsonSpy : jest.SpyInstance;

    beforeEach(() => {
        responseMock = new ResponseMock() as unknown as Response;
        sendStatusSpy = jest.spyOn(responseMock, "sendStatus");
        jsonSpy = jest.spyOn(responseMock, "json");
    })

    it("Should return the right product if it exists", () => {
        const {repository, products} = RepositoryFixture.createFilledRepository(1);

        getProduct(RequestFixture.getRequestWithProductIdParam(products[0].id), responseMock, repository);

        expect(sendStatusSpy).not.toBeCalled();
        expect(jsonSpy).toHaveBeenCalledTimes(1);
        expect(jsonSpy).toHaveBeenCalledWith(products[0]);
    })

    it("Should return 404 if the product doesn't exist", () => {
        const repository = RepositoryFixture.createRepository();

        getProduct(RequestFixture.getRequestWithProductIdParam(uuidV4()), responseMock, repository);

        expect(jsonSpy).not.toBeCalled();
        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(404);
    })

    it("Should return 400 if the given product id is invalid", () => {
        const repository = RepositoryFixture.createRepository();

        getProduct(RequestFixture.getRequestWithProductIdParam(undefined), responseMock, repository);

        expect(jsonSpy).not.toBeCalled();
        expect(sendStatusSpy).toHaveBeenCalledTimes(1);
        expect(sendStatusSpy).toHaveBeenCalledWith(400);
    })
})