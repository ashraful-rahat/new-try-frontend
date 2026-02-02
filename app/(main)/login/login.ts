"use client";

import { AuthResponse } from "@/app/interfaces/auth.interface";
import axiosInstance from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post<
        {
          success: boolean;
        } & AuthResponse
      >("/auth/login", {
        email,
        password,
      });

      const data = res.data;

      if (!data.success) {
        setError(data.message || "লগইন ব্যর্থ হয়েছে");
        return;
      }

      // 🟢 SUCCESS
      setSuccess("সফলভাবে লগইন হয়েছে");

      // Save token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Role based redirect
      if (data.admin?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "ভুল email বা password");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    handleLogin,
  };
}
