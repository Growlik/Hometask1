"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const testing_router_1 = require("./Routes/testing-router");
const blogs_router_1 = require("./Routes/blogs-router");
const posts_router_1 = require("./Routes/posts-router");
exports.app = (0, express_1.default)();
const parserMiddleware = express_1.default.json();
exports.app.use(parserMiddleware);
const port = process.env.PORT || 5001;
exports.app.use('/testing', testing_router_1.testingRouter);
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
