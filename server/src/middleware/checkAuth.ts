import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from "../utils/generateToken.ts";


export const checkTokenMiddleware = (req: Request, res: Response, next:NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) {
        res.status(401).json({message: "no token"})
    }
    try{
        jwt.verify(token!, ACCESS_TOKEN_SECRET)
        next()
    } catch(e){
        res.status(401).json({message: "invalid or expired token"})
    }
}