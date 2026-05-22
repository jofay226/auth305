import axios from "axios";

export const verifyTokenInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json"
    }
})


export const verifyToken = async (verifyInstance) => {
    const res = await verifyInstance.get('/auth/verify')
    return res
}