import {blogs} from "./blogs-repository";
import {posts} from "./posts-repository";
export const testingRepository= {
    removeBlogs() {
        while (blogs.length > 0) {
            blogs.pop();
        }
    },
    removePosts() {
        while (posts.length > 0) {
            posts.pop();
        }
    }
}
