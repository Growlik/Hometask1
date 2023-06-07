import {Request, Response, Router} from 'express'

enum availableResolution  {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}

type videoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean | null,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: availableResolution[] | null
}

export let videos: videoType[] =[
    {
        id: 1,
        title: "First video",
        author: "First authorsw",
        canBeDownloaded: true,
        minAgeRestriction: 1,
        createdAt: "2023-06-03T16:28:42.284Z",
        publicationDate: "2023-06-03T16:28:42.284Z",
        availableResolutions: [
            availableResolution.P144
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
            availableResolution.P144, availableResolution.P240, availableResolution.P360, availableResolution.P480
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
            availableResolution.P720, availableResolution.P1080, availableResolution.P1440, availableResolution.P2160
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
            availableResolution.P2160
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

const validResolutions = Object.values(availableResolution) // ['P144', ...]

// Create new video
videosRouter.post ('/', (req: Request, res: Response) => {
    //let minAgeRestriction: number | null = req.body.minAgeRestriction
    //let canBeDownloaded: boolean = req.body.canBeDownloaded
    let title: string = req.body.title
    let author: string = req.body.author
    //let createdAt:string = req.body.createdAt
    //let publicationDate: string = req.body.publicationDate
    let availableResolutions: availableResolution[] | null = req.body.availableResolutions

    const errors = []
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.push({
            "message": "Incorrect format",
            "field": "author"
        })
    }
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            "message": "Incorrect format",
            "field": "title"
        })
    }

    if (errors.length > 0) {
        res.status(400).send({errorsMessages: errors})

    } else {
        const today = new Date()
        //publication date
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: today.toISOString(),
            publicationDate: tomorrow.toISOString(),
            availableResolutions: availableResolutions || null
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    }
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
    let minAgeRestriction: number | null = req.body.minAgeRestriction
    let canBeDownloaded: boolean = req.body.canBeDownloaded
    let title: string = req.body.title
    let author: string = req.body.author
    let publicationDate: string = req.body.publicationDate
    let availableResolutions: availableResolution[] | null = req.body.availableResolutions
    const errors = []
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
       errors.push({
           "message": "Incorrect format",
           "field": "author"
       })
    }
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push
        ({
            "message": "Incorrect format",
            "field": "title"
        })
    }
    if(typeof canBeDownloaded !== 'boolean') {
        errors.push
        ({
                "message": "Incorrect format",
                "field": "canBeDownloaded"
        })
    }
    if(typeof minAgeRestriction !== 'number' || minAgeRestriction > 18  || typeof minAgeRestriction !== null) {
        errors.push
        ({
            "message": "Incorrect format",
            "field": "minAgeRestriction"
        })
    }
    if (errors.length) {
        res.status(400).send({errorsMessages: errors}
        )
    } else {
    let video = videos.find(v => v.id === +req.params.id)
    if (video) {
        video.title = title
        video.author = author
        video.canBeDownloaded = canBeDownloaded
        video.minAgeRestriction = minAgeRestriction
        video.availableResolutions = availableResolutions
        video.publicationDate = publicationDate
        res.status(204).send(video)
    } else {
        res.send(404)
    }
}})


// Delete video specified by id
videosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})