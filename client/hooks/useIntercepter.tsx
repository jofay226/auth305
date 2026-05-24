import { verifyTokenInstance } from "@/libs/tanstack/api";
import { useAuthStore } from "@/libs/zustand/authStore";
import { useEffect } from "react";
import { useRefresh } from "./useRefresh";

export const useIntercepter = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refresh = useRefresh();

  useEffect(() => {
    const reqIntercepter = verifyTokenInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
    );

    const resIntercepter = verifyTokenInstance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (err) => {
        const originalReq = err.config;

        if (err.status === 401 && !originalReq._retry) {
          originalReq._retry = true;
          try {
            const newAccessToken = await refresh();
            originalReq.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return verifyTokenInstance(originalReq);
          } catch (err) {
            console.log("refresh expired");
            return Promise.reject(err);
          }
        }

        return Promise.reject(err);
      },
    );

    return () => {
      verifyTokenInstance.interceptors.request.eject(reqIntercepter);
      verifyTokenInstance.interceptors.response.eject(resIntercepter);
    };
  }, []);

  return verifyTokenInstance;
};
