import {NextFunction, Request, Response} from "express";

// export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const {username, password} = req.body
//     if (!(username === 'admin' && password === 'qwerty')) {
//         res.sendStatus(401)
//     } else {
//         next();
//     }
// }
export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    res.send(authHeader)
    next;
}