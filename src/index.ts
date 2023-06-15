import express from 'express'
import {testingRouter} from "./Routes/testing-router";
import {blogsRouter} from "./Routes/blogs-router";
import {postsRouter} from "./Routes/posts-router";

export const app = express()

const parserMiddleware = express.json()
app.use(parserMiddleware)

const port = process.env.PORT || 5001

app.use('/testing', testingRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})