"use client";

import { useVerifyToken } from "@/libs/tanstack/query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// import { useAuthStore } from "@/libs/zustand/authStore";

export default function Home() {
  // const accessToken = useAuthStore((state) => state.accessToken);
  // console.log(`our access token : ${accessToken}`);
  // const router = useRouter();
  // const { data, isLoading } = useVerifyToken();

  // useEffect(() => {
  //   if (data?.status === 401) {
  //     router.push("/login");
  //   }
  // }, [data, router]);
  const isLoading = true;

  if (isLoading) {
    return (
      <main
        className="spider-loader-screen"
        aria-label="Loading protected page"
      >
        <div className="spider-web" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="spider-loader">
          <div className="web-line" />
          <div className="spider-mask">
            <div className="spider-eye spider-eye-left" />
            <div className="spider-eye spider-eye-right" />
          </div>
          <div className="loading-pulse">
            <span />
            <span />
            <span />
          </div>
        </div>

        <p className="spider-loader-text">Loading</p>
      </main>
    );
  }
  return <>PROTECTED PAGE USER RPOFILE</>;
}
