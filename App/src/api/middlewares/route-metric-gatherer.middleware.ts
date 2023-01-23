import {NextFunction, Request, Response} from "express";
import {Histogram} from "prom-client";
import register from "../../monitoring/register";

const httpRequestTimer = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'url', 'code'],
    buckets: [0.001, 0.01, 0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.001 to 10 seconds
});

register.registerMetric(httpRequestTimer);

export async function routeMetricsGatherer(req: Request, res: Response, next: NextFunction){
    const end = httpRequestTimer.startTimer();
    const originalUrl = req.originalUrl;
    const method = req.method;

    res.on('finish', () => {
        end({ url: originalUrl, code: res.statusCode, method })
    })

    next();
}