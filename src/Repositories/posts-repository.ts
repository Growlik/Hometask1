import {blogsRepository} from "./blogs-repository";

export const posts =[
    {
        id: "1",
        title: "first title",
        shortDescription: "first description",
        content: "first content",
        blogId: "1",
        blogName: "firstBlog"
    },
    {
        id: "2",
        title: "second title",
        shortDescription: "second description",
        content: "second content",
        blogId: "2",
        blogName: "secondBlog"
    }
]

export const postsRepository = {
    findPosts() {
        return posts;
    },
    findPostById(id: string) {
        return posts.find(p => p.id === id);
    },
    createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const relatedBlog = blogsRepository.findBlogById(blogId)
        if (!relatedBlog) {
            return;
        }
        const newPost = {
            id: Date.now().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: relatedBlog.name
        }
        posts.push(newPost)
        return newPost;
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        let post = posts.find(b => b.id === id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            return true;
        } else {
            return false;
        }
    },
    removePost(id:string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}