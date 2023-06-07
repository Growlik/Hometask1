"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const videos_router_1 = require("./videos-router");
exports.testingRouter = (0, express_1.Router)({});
//deleting all the videos
exports.testingRouter.delete('/all-data', (req, res) => {
    while (videos_router_1.videos.length > 0) {
        videos_router_1.videos.pop();
    }
    res.send(204);
});
