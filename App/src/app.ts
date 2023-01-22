import express from 'express';

import router from "./api/router";
import {metrics} from "./api/routes/metrics.route";
import {routeMetricGatherer} from "./api/middlewares/route-metric-gatherer.middleware";
import {occasionalFailSimulator} from "./api/middlewares/occasional-fail-simulator.middleware";
import {occasionalDelaySimulator} from "./api/middlewares/occasional-delay-simulator.middleware";

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
        this.server.use(routeMetricGatherer);
        this.server.use(occasionalFailSimulator);
        this.server.use(occasionalDelaySimulator);
    }

    routes() {
        this.server.get("/metrics", metrics);
        this.server.use("/api", router);
    }
}

export default new App().server;