import express from 'express';

import router from "./api/router";
import {metrics} from "./api/routes/metrics.route";
import {routeMetricsGatherer} from "./api/middlewares/route-metric-gatherer.middleware";
import {occasionalFailSimulator} from "./api/middlewares/occasional-fail-simulator.middleware";
import {occasionalDelaySimulator} from "./api/middlewares/occasional-delay-simulator.middleware";

class App {
    public server;

    constructor() {
        this.server = express();

        this.routesWithoutMiddleware();
        this.middlewares();
        this.routes();

        console.info("Server instantiated");
    }

    routesWithoutMiddleware(){
        this.server.get("/metrics", metrics);
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(routeMetricsGatherer);
        this.server.use(occasionalDelaySimulator);
        this.server.use(occasionalFailSimulator);
    }

    routes() {
        this.server.use("/api", router);
    }
}

export default new App().server;