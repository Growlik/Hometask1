import {Request, Response, Router} from 'express'
import {blogsRepository} from "../Repositories/blogs-repository"
import {inputBlogsValidation, inputValidationMiddleware} from "../MIddlewares/input-validation-middleware";
import {authenticationMiddleware} from "../MIddlewares/authentication-middleware";
export const blogsRouter = Router({})

type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
//Return all blogs
blogsRouter.get('/', (req: Request, res: Response) => {
    const foundBlogs = blogsRepository.findBlogs()
    res.status(200).send(foundBlogs)
})
//Return blog by id
blogsRouter.get('/:id', (req: Request, res: Response) => {
    let blog = blogsRepository.findBlogById(+req.params.id)
    if (blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }
})
//Create new post
blogsRouter.post ('/',
    authenticationMiddleware,
    inputBlogsValidation.name,
    inputBlogsValidation.description,
    inputBlogsValidation.websiteUrl,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newBlog = blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(201).send(newBlog)
})
//Update existing blog by id with InputModel
blogsRouter.put('/:id',
    authenticationMiddleware,
    inputBlogsValidation.name,
    inputBlogsValidation.description,
    inputBlogsValidation.websiteUrl,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const isUpdated = blogsRepository.updateBlog(+req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (isUpdated) {
        const blog = blogsRepository.findBlogById(+req.params.id)
        res.status(204).send(blog)
    } else {
        res.sendStatus(404)
    }
})
//Delete blog specified by id
blogsRouter.delete('/:id', (req: Request, res: Response) => {
    const isRemoved = blogsRepository.removeBlog(+req.params.id)
    if (isRemoved) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})