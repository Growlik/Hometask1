import {Request, Response, Router} from 'express'

import {videos} from "./videos-router";

export const testingRouter = Router({})

//deleting all the videos
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videos.length =0
    res.send(204)
})