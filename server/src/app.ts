import express from 'express';
import authRouter from './routes/auth.routes.ts'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser" 

dotenv.config()
const app = express();


app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRouter)

export default app