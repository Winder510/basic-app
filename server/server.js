import express from 'express'
import morgan from 'morgan'
import router from './src/routes/index.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

//init dbs
import Database from './src/dbs/init.mongo.js'
await Database.connect()


//init middleware
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))

app.get('/health', (req, res) => {
    res.send('OK')
})
//init route
app.use('/', router)


// handling error
app.use((req, res, next) => {
    const error = new Error('Not found !!');
    error.status = 404;
    next(error);
});

// The default error handler`
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    console.log(' --Debug Error-- ', error);
    return res.status(statusCode).json({
        status: 'Error!!',
        code: statusCode,
        message: error.message || 'Internal server error',
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
// export default app;