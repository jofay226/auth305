import axios, { AxiosInstance } from "axios";


export const verifyTokenInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json"
    },
    method: "GET"
})


export const verifyToken = async (verifyInstance: AxiosInstance, token: string) => {
    try{
        const res = await verifyInstance('/auth/verify', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    } catch(e){
        return {message: 'validation failed', status: 401}
    }
}