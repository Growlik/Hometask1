"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const testing_repository_1 = require("../Repositories/testing-repository");
exports.testingRouter = (0, express_1.Router)({});
//deleting all data
exports.testingRouter.delete('/all-data', (req, res) => {
    testing_repository_1.testingRepository.removeBlogs();
    testing_repository_1.testingRepository.removePosts();
    res.sendStatus(204);
});
