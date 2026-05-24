import { verifyTokenInstance } from "@/libs/tanstack/api";
import { useAuthStore } from "@/libs/zustand/authStore";
import { useEffect } from "react";

export const useIntercepter = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const reqIntercepter = verifyTokenInstance.interceptors.request.use(
      (config) => {
        console.log("req intercepter");
        console.log(config);

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
    );

    return () => {
      verifyTokenInstance.interceptors.request.eject(reqIntercepter);
    };
  }, []);

  return verifyTokenInstance;
};
