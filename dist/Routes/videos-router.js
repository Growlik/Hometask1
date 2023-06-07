"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = exports.videos = void 0;
const express_1 = require("express");
var availableResolution;
(function (availableResolution) {
    availableResolution["P144"] = "P144";
    availableResolution["P240"] = "P240";
    availableResolution["P360"] = "P360";
    availableResolution["P480"] = "P480";
    availableResolution["P720"] = "P720";
    availableResolution["P1080"] = "P1080";
    availableResolution["P1440"] = "P1440";
    availableResolution["P2160"] = "P2160";
})(availableResolution || (availableResolution = {}));
exports.videos = [
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
];
exports.videosRouter = (0, express_1.Router)({});
// Returns all videos
exports.videosRouter.get('/', (req, res) => {
    if (exports.videos.length > 0) {
        res.status(200).send(exports.videos);
    }
    else {
        res.send(404);
    }
});
const validResolutions = Object.values(availableResolution); // ['P144', ...]
// Create new video
exports.videosRouter.post('/', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let availableResolutions = req.body.availableResolutions;
    const errors = [];
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.push({
            "message": "Incorrect format",
            "field": "author"
        });
    }
    if (!availableResolutions || availableResolutions.length > validResolutions.length || !availableResolutions.every((aR) => validResolutions.includes(aR))) {
        errors.push({
            "message": "Incorrect format",
            "field": "availableResolutions"
        });
    }
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            "message": "Incorrect format",
            "field": "title"
        });
    }
    if (errors.length > 0) {
        res.status(400).send({ errorsMessages: errors });
    }
    else {
        const today = new Date();
        //publication date
        const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
        const newVideo = {
            id: +today,
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: today.toISOString(),
            publicationDate: tomorrow.toISOString(),
            availableResolutions: availableResolutions || []
        };
        exports.videos.push(newVideo);
        res.status(201).send(newVideo);
    }
});
// Return video by id
exports.videosRouter.get('/:id', (req, res) => {
    let video = exports.videos.find(v => v.id === +req.params.id);
    if (video) {
        res.status(200).send(video);
    }
    else {
        res.sendStatus(404);
    }
});
// Update existing video by id with InputModel
exports.videosRouter.put('/:id', (req, res) => {
    let minAgeRestriction = req.body.minAgeRestriction;
    let canBeDownloaded = req.body.canBeDownloaded;
    let title = req.body.title;
    let author = req.body.author;
    let publicationDate = req.body.publicationDate;
    let availableResolutions = req.body.availableResolutions;
    const errors = [];
    if (!availableResolutions || availableResolutions.length > validResolutions.length || !availableResolutions.every((aR) => validResolutions.includes(aR))) {
        errors.push({
            "message": "Incorrect format",
            "field": "availableResolutions"
        });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.push({
            "message": "Incorrect format",
            "field": "author"
        });
    }
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            "message": "Incorrect format",
            "field": "title"
        });
    }
    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
        errors.push({
            "message": "Incorrect format",
            "field": "canBeDownloaded"
        });
    }
    console.log(minAgeRestriction);
    if (!minAgeRestriction || typeof minAgeRestriction !== 'number' || minAgeRestriction < 0 || minAgeRestriction > 18) {
        errors.push({
            "message": "Incorrect format",
            "field": "minAgeRestriction"
        });
    }
    if (!publicationDate || typeof publicationDate !== 'string') {
        errors.push({
            "message": "Incorrect format",
            "field": "publicationDate"
        });
    }
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
    }
    else {
        let video = exports.videos.find(v => v.id === +req.params.id);
        if (video) {
            video.title = title;
            video.author = author;
            video.canBeDownloaded = canBeDownloaded;
            video.minAgeRestriction = minAgeRestriction;
            video.availableResolutions = availableResolutions;
            video.publicationDate = publicationDate;
            res.status(204).send(video);
        }
        else {
            res.sendStatus(404);
        }
    }
});
// Delete video specified by id
exports.videosRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < exports.videos.length; i++) {
        if (exports.videos[i].id === +req.params.id) {
            exports.videos.splice(i, 1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
});
