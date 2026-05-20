"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/libs/zustand/authStore";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const saveToken = useAuthStore((state) => state.actions.saveAccessToken);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const formHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginHandler = async () => {
    const res = await axios.post("http://localhost:4000/auth/login", form, {
      withCredentials: true,
    });
    if (res.statusText === "OK") {
      saveToken(res.data);
      router.push("/");
    }
    console.log(res);
  };

  return (
    <div>
      <input
        onChange={formHandler}
        name="email"
        placeholder="email"
        type="text"
      />
      <input
        onChange={formHandler}
        name="password"
        placeholder="password"
        type="text"
      />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}

export default LoginPage;
