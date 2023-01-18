import {helloWorld} from "../../api/routes/hello-world.route";
import {Request, Response} from "express";

class ResponseMock {
    json() {}
}

describe("Hello world route", () => {
    let responseMock: ResponseMock;
    let jsonSpy: jest.SpyInstance;

    beforeEach(() => {
        responseMock = new ResponseMock();
        jsonSpy = jest.spyOn(responseMock, "json");
    })

    it("Should return a hello world message", () => {
        helloWorld({} as unknown as Request, responseMock as unknown as Response);

        expect(jsonSpy).toHaveBeenCalledTimes(1);
        expect(jsonSpy).toHaveBeenCalledWith({
            message: "Hello, world !"
        })
    })
})