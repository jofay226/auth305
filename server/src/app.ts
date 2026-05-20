import express from 'express';
import authRouter from './routes/auth.routes.ts'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser" 
import cors from 'cors'

dotenv.config()
const app = express();

app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRouter)

export default app