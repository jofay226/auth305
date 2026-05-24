import { useQuery } from "@tanstack/react-query"
import { verifyToken, verifyTokenInstance } from "./api"
import { useAuthStore } from "../zustand/authStore"

export const useVerifyToken = () => {
    const accessToken = useAuthStore(state => state.accessToken)
    return useQuery({
        queryKey: ["token"],
        queryFn: () => verifyToken(verifyTokenInstance,accessToken)
    })
}