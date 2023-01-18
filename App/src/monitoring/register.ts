import {collectDefaultMetrics, Registry} from "prom-client";

const register = new Registry();

collectDefaultMetrics({
    register: register,
    prefix: 'ecoshop_backend_',
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
});

export default register;