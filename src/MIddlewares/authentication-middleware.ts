import {NextFunction, Request, Response} from "express";
import {usersRepository} from "../Repositories/users-repository";

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    if (authHeader === usersRepository[0].loginPass) {
    next();
    } else {
        res.sendStatus(401)
    }
}