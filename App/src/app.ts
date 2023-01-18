import express from 'express';

import router from "./api/router";

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
        console.info("Server instantiated");
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(router);
    }
}

export default new App().server;