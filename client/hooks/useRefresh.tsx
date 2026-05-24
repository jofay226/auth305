import { useAuthStore } from "@/libs/zustand/authStore";
import axios from "axios";

export const useRefresh = () => {
  const saveToken = useAuthStore((state) => state.actions.saveAccessToken);
  const refresh = async () => {
    const res = await axios.get("http://localhost:4000/auth/refresh", {
      withCredentials: true,
    });
    saveToken(res.data);
    return res.data;
  };

  return refresh;
};
