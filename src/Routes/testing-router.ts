import {Request, Response, Router} from 'express'

import {testingRepository} from "../Repositories/testing-repository";
export const testingRouter = Router({})

//deleting all data
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    testingRepository.removeBlogs()
    testingRepository.removePosts()
    res.sendStatus(204)
})