import {Request, Response, Router} from 'express'

const videos =[
    {
        id: 1,
        title: "First video",
        canBeDownloaded: true
    },
    {
        id: 2,
        title: "Second video",
        canBeDownloaded: false
    },
    {
        id: 3,
        title: "Third video",
        canBeDownloaded: true
    },
    {
        id: 4,
        title: "Fourth video",
        canBeDownloaded: false
    }
]

export const videosRouter = Router({})

// Returns all videos
videosRouter.get('/', (req: Request, res: Response) => {
    if (videos.length > 0) {
        res.status(200).send(videos)
    } else {
        res.send(404)
    }
})

// Create new video
videosRouter.post ('/', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim()) {
        res.status(400).send({
            errorsMessages: [{
                "message": "Incorrect title",
                "field": "title"
            }]
        })
        return;
    }
    const newVideo = {
        id: +(new Date()),
        title: title
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

// Return video by id
videosRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.send(404)
    }
})

// Update existing video by id with InputModel
videosRouter.put('/:id', (req: Request, res: Response) => {
    let canBeDownloaded = req.body.canBeDownloaded
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim() || !canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
        res.status(400).send({
         errorsMessages:
             [{"message": "Incorrect title",
                 "field": "title" },
             {"message": "Incorrect format",
                 "field": "canBeDownloaded" }]
        })
        return;
    }
    let video = videos.find(v => v.id === +req.params.id)
    if (video) {
        video.title = title
        res.status(204).send(video)
    } else {
        res.send(404)
    }
})

// Delete video specified by id
videosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i =0; i < videos.length; i++){
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})

// videosRouter.get('/', (req: Request, res: Response) => {
//     if (req.query.title) {
//         let searchString = req.query.title.toString()
//         res.send(videos.filter(v => v.title.indexOf(searchString) > -1))
//     } else {
//         res.send(videos)
//     }
// })
