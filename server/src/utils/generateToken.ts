import jwt from 'jsonwebtoken';
import { cryptoKeyGenerate } from './generateCryptoKey.ts';


export const ACCESS_TOKEN_SECRET = cryptoKeyGenerate();
export const REFRESH_TOKEN_SECRET = cryptoKeyGenerate();



export const generateAccessToken = (id: string) => {
    return jwt.sign({id}, ACCESS_TOKEN_SECRET, {expiresIn: "1m"})
}


export const generateRefreshToken = (id: string) => {
    return jwt.sign({id}, REFRESH_TOKEN_SECRET, {expiresIn: "2m"})
}