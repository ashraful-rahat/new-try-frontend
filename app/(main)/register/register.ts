import { useState } from "react";

import { AuthResponse } from "@/app/interfaces/auth.interface";
import axiosInstance from "@/app/utils/axios";
import { useRouter } from "next/navigation";

export function useRegister() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড মিলছে না");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await axiosInstance.post<AuthResponse>("/auth/register", {
        email,
        password,
      });

      const { token, message } = res.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      setSuccess(message || "রেজিস্ট্রেশন সফল হয়েছে");

      // Register → Home
      setTimeout(() => {
        router.push("/");
      }, 800);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleRegister,
  };
}
