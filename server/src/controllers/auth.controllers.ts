import type {Request, Response} from 'express';
import { loginSchema, registerSchema } from '../libs/zod/zod.ts';
import { authServices } from '../services/auth.services.ts';

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

    res.json(result)
}





