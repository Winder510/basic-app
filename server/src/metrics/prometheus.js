import client from 'prom-client'

const register = new client.Registry()

client.collectDefaultMetrics({
    register
})

const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
})

const httpRequestDurationSeconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
})

const httpRequestsInFlight = new client.Gauge({
    name: 'http_requests_in_flight',
    help: 'Number of in-flight HTTP requests'
})

register.registerMetric(httpRequestsTotal)
register.registerMetric(httpRequestDurationSeconds)
register.registerMetric(httpRequestsInFlight)

const normalizeRoute = (req) => {
    if (req.route?.path) {
        return req.baseUrl ? `${req.baseUrl}${req.route.path}` : req.route.path
    }

    return req.path || req.originalUrl || 'unknown'
}

const metricsMiddleware = (req, res, next) => {
    httpRequestsInFlight.inc()
    const start = process.hrtime.bigint()

    res.on('finish', () => {
        const durationSeconds = Number(process.hrtime.bigint() - start) / 1000000000
        const labels = {
            method: req.method,
            route: normalizeRoute(req),
            status_code: String(res.statusCode)
        }

        httpRequestsTotal.inc(labels)
        httpRequestDurationSeconds.observe(labels, durationSeconds)
        httpRequestsInFlight.dec()
    })

    next()
}

const metricsHandler = async (req, res) => {
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
}

export {
    metricsMiddleware,
    metricsHandler,
    register
}