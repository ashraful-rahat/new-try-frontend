import { AuthResponse } from "@/app/interfaces/auth.interface";
import axiosInstance from "@/app/utils/axios";
import { useState } from "react";

export function useRegister() {
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

      const res = await axiosInstance.post<AuthResponse>("/auth/register", {
        email,
        password,
      });

      setSuccess(res.data.message || "রেজিস্ট্রেশন সফল হয়েছে 🎉");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
