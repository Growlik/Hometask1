export const posts =[
    {
        id: 1,
        title: "first title",
        shortDescription: "first description",
        content: "first content",
        blogId: "first Id",
        blogName: "first blog",
    },
    {
        id: 2,
        title: "second title",
        shortDescription: "second description",
        content: "second content",
        blogId: "second Id",
        blogName: "second blog"
    }
]

export const postsRepository = {
    findPosts() {
        return posts;
    },
    findPostById(id: number) {
        return posts.find(p => p.id === id);
    },
    createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const newPost = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        }
        posts.push(newPost)
        return newPost
    },
    updatePost(id: number, title: string, shortDescription: string, content: string, blogId: string) {
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
    removePost(id:number) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}