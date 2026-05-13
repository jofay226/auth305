import type {Request, Response} from 'express';
import { registerSchema } from '../libs/zod/zod.ts';
import { authServices } from '../services/auth.services.ts';

export const registerController = async (req: Request, res: Response) => {
    const validationResult = registerSchema.safeParse(req.body);
   
    if(!validationResult.success){
        res.json({statusCode: 400, message: "wrong input format", data: null})
    }
    const result = await authServices.register(validationResult.data!)
    res.status(result.statusCode).json(result)
}