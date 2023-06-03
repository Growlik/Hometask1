import {Request, Response, Router} from 'express'

import {videos} from "./videos-router";

export const testingRouter = Router({})

//deleting all the videos
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    while(videos.length > 0) {
        videos.pop();
    }
    res.send(204)
})