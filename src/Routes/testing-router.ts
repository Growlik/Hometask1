import {Request, Response, Router} from 'express'
let videos =[
    {
        id: 1,
        title: "First video"
    },
    {
        id: 2,
        title: "Second video"
    },
    {
        id: 3,
        title: "Third video"
    },
    {
        id: 4,
        title: "Fourth video"
    }
]

export const testingRouter = Router({})

//deleting all the videos
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videos = []
    res.send(204)
})