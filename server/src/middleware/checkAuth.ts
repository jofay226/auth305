import type { NextFunction, Request, Response } from "express";



export const checkTokenMiddleware = (req: Request, res: Response, next:NextFunction) => {
    next()
}