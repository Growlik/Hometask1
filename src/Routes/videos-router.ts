import {Request, Response, Router} from 'express'

const videos =[
    {
        id: 1,
        title: "First video",
        author: "First author",
        canBeDownloaded: true,
        minAgeRestriction: 1,
        createdAt: "2023-06-03T16:28:42.284Z",
        publicationDate: "2023-06-03T16:28:42.284Z",
        availableResolutions: [
            "P144"
        ]
    },
    {
        id: 2,
        title: "Second video",
        author: "Second author",
        canBeDownloaded: false,
        minAgeRestriction: 2,
        createdAt: "2023-06-03T16:28:42.284Z",
        publicationDate: "2023-06-03T16:28:42.284Z",
        availableResolutions: [
            "P144", "P240"
        ]
    },
    {
        id: 3,
        title: "Third video",
        author: "Third author",
        canBeDownloaded: true,
        minAgeRestriction: 3,
        createdAt: "2023-06-03T16:28:42.284Z",
        publicationDate: "2023-06-03T16:28:42.284Z",
        availableResolutions: [
            "P144", "P240", "P360"
        ]
    },
    {
        id: 4,
        title: "Fourth video",
        author: "Fourth author",
        canBeDownloaded: false,
        minAgeRestriction: 4,
        createdAt: "2023-06-03T16:28:42.284Z",
        publicationDate: "2023-06-03T16:28:42.284Z",
        availableResolutions: [
            "P144", "P240", "P360", "P480"
        ]
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
    let minAgeRestriction = req.body.minAgeRestriction
    let canBeDownloaded = req.body.canBeDownloaded
    let title = req.body.title
    let author = req.body.author
    let createdAt = req.body.createdAt
    let publicationDate = req.body.publicationDate
    let availableResolutions =req.body.availableResolutions
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
        title: title,
        author: author,
        canBeDownloaded: canBeDownloaded,
        minAgeRestriction: minAgeRestriction,
        createdAt: createdAt,
        publicationDate: publicationDate,
        availableResolutions: availableResolutions
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
    let minAgeRestriction = req.body.minAgeRestriction
    let canBeDownloaded = req.body.canBeDownloaded
    let title = req.body.title
    let author = req.body.author
    if (!author || typeof author !== 'string' || !author.trim()) {
        res.send({
            errorsMessages: [{
                "message": "Incorrect format",
                "field": "author"
            }]
        })
    }
    if (!title || typeof title !== 'string' || !title.trim()) {
        res.send({
         errorsMessages:
             [{
                 "message": "Incorrect format",
                 "field": "title"
             }]
        })
    }
    if(typeof canBeDownloaded !== 'boolean') {
        res.send({
            errorsMessages: [{
                "message": "Incorrect format",
                    "field": "canBeDownloaded"
            }]
        })
    }
    if(typeof minAgeRestriction !== 'number' || typeof minAgeRestriction !== 'object') {
        res.send({
            errorsMessages: [{
                "message": "Incorrect format",
                "field": "minAgeRestriction"
            }]
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
