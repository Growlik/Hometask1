import express, {query, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {videosRouter} from "./Routes/videos-router";
import {testingRouter} from "./Routes/testing-router";
export const app = express()

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const port = process.env.PORT || 5000

app.use('/testing', testingRouter)
app.use('/videos', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})