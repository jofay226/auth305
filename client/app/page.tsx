"use client";

import { useAuthStore } from "@/libs/zustand/authStore";

export default function Home() {
  const accessToken = useAuthStore((state) => state.accessToken);
  console.log(`our access token : ${accessToken}`);

  return <>PROTECTED PAGE USER RPOFILE</>;
}
