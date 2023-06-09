import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {blogsRepository} from "../Repositories/blogs-repository";

export const inputBlogsValidation = {
    name: body('name')
        .trim().isString().withMessage('Must be string')
        .isLength({min: 1, max: 15}).withMessage('Length should be from 1 to 15 symbols'),
    description: body('description')
        .trim().isString().withMessage('Must be string')
        .isLength({min: 1, max: 500}).withMessage('Length should be from 1 to 500 symbols'),
    websiteUrl: body('websiteUrl')
        .isURL().withMessage('Must be URL')
}
export const inputPostsValidation = {
    title: body('title')
        .trim().isString().withMessage('Must be string')
        .isLength({min: 1, max: 30}).withMessage('Length should be from 1 to 30 symbols'),
    shortDescription: body('shortDescription')
        .trim().isString().withMessage('Must be string')
        .isLength({min: 1, max: 100}).withMessage('Length should be from 1 to 100 symbols'),
    content: body('content')
        .trim().isString().withMessage('Must be string')
        .isLength({min: 1, max: 1000}).withMessage('Length should be from 1 to 1000 symbols'),
    blogId: body('blogId')
        .trim().isString().withMessage('Must be string')
        .isLength({min: 1}).withMessage('Length should be more than 1 symbol')
        .custom(value => { if (!blogsRepository.findBlogById(value)) {
            throw new Error('Blog is not found')
} else {
            return true;
        }
})
}

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({onlyFirstError: true})
     if (errors.length > 0 ){
        const sanitizedErrors = errors.map((error)=>{
            if (error.type === "field") {
                return {message: error.msg,
                        field: error.path
                }
            }else {
                return null;
            }
        })
        res.status(400).send({errorsMessages: sanitizedErrors})
    } else {
        next()
    }
}


