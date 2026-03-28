const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']

    if (!apiKey) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Unauthorized: Missing x-api-key header'
        })
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            statusCode: 403,
            message: 'Forbidden: Invalid x-api-key'
        })
    }

    next()
}

export default { checkApiKey }
