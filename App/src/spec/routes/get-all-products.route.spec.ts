import {Response} from "express";
import {ResponseMock} from "../utils/response-mock";
import {RepositoryFixture} from "../utils/repository-fixture";
import {getAllProducts} from "../../api/routes/get-all-products.route";
import {RequestFixture} from "../utils/request-fixture";

describe("Get all products route", () => {
    let responseMock: Response;
    let jsonSpy: jest.SpyInstance;

    beforeEach(() => {
        responseMock = new ResponseMock() as unknown as Response;
        jsonSpy = jest.spyOn(responseMock, "json");
    })

    it("Should return all products in the repository", () => {
        const {repository, products} = RepositoryFixture.createFilledRepository();

        getAllProducts(RequestFixture.getEmptyRequest(), responseMock, repository);

        expect(jsonSpy).toHaveBeenCalledWith({
            products: products
        })
    })

    it('should return an empty list if the repository is empty',  () => {
        const repository = RepositoryFixture.createRepository();

        getAllProducts(RequestFixture.getEmptyRequest(), responseMock, repository);

        expect(jsonSpy).toHaveBeenCalledWith({
            products: []
        })
    });
})