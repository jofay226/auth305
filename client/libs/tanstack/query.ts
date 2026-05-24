import { useQuery } from "@tanstack/react-query"
import { verifyToken } from "./api"
import { useIntercepter } from "@/hooks/useIntercepter"

export const useVerifyToken = () => {
    const verifyTokenInstance = useIntercepter()
    return useQuery({
        queryKey: ["token"],
        queryFn: () => verifyToken(verifyTokenInstance)
    })
}