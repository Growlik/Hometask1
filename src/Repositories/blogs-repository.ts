export const blogs =[
    {
    id: "1",
        name: "firstBlog",
        description: "first description",
        websiteUrl: "https://superblog.com/1"},
    {
    id: "2",
        name: "secondBlog",
        description: "second description",
        websiteUrl: "https://superblog.com/2"
    }]
export const blogsRepository = {
    findBlogs() {
        return blogs;
    },
    findBlogById(id: string) {
        return blogs.find(b => b.id === id);
    },
    createBlog(name: string, description: string, websiteUrl: string) {
        const newBlog = {
            id: (new Date()).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },
    updateBlog(id: string, name: string, description: string, websiteUrl: string) {
        let blog = blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true;
        } else {
            return false;
        }
    },
    removeBlog(id:string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
        }
    }
        return false;
}
}