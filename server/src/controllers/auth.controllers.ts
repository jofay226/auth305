import type {Request, Response} from 'express';
import { loginSchema, registerSchema } from '../libs/zod/zod.ts';
import { authServices } from '../services/auth.services.ts';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.ts';
import prisma from '../libs/prisma/prisma.ts';

export const registerController = async (req: Request, res: Response) => {
    const validationResult = registerSchema.safeParse(req.body);
   
    if(!validationResult.success){
        res.json({statusCode: 400, message: "wrong input format", data: null})
    }
    const result = await authServices.register(validationResult.data!)
    res.status(result.statusCode).json(result)
}

export const loginController = async (req: Request, res: Response) => {
    const validationResult = loginSchema.safeParse(req.body);
   
    if(!validationResult.success){
        res.json({statusCode: 400, message: "wrong input format", data: null})
        return
    }

    const result = await authServices.login(validationResult.data!)
    
    if(result.statusCode === 401) {
        res.status(result.statusCode).json(result)
        return
    }

    const refreshToken = generateRefreshToken(result.data?.id!);

    await prisma.user.update({
        where: {id: result.data?.id!},
        data: {
            refreshToken: refreshToken
        }
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "strict"
    })
    res.json(generateAccessToken(result.data?.id!))
}

export const verifyTokenController = (req: Request, res: Response) => {
    res.json({message: "access granted"})
}

export const refreshController = async (req: Request, res: Response) => {
    
}


