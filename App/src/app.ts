import express from 'express';

import router from "./api/router";
import {metrics} from "./api/routes/metrics.route";
import {routeTimerMetric} from "./api/middlewares/route-timer-metric.middleware";

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
        this.server.use(routeTimerMetric);
    }

    routes() {
        this.server.get("/metrics", metrics);
        this.server.use("/api", router);
    }
}

export default new App().server;