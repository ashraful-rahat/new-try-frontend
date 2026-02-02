import { AuthResponse } from "@/app/interfaces/auth.interface";
import axiosInstance from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await axiosInstance.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      const { token, admin, message } = res.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      setSuccess(message || "লগইন সফল হয়েছে");

      // ⏳ small delay for UX (optional but nice)
      setTimeout(() => {
        if (admin?.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }, 800);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "ভুল ইমেইল বা পাসওয়ার্ড");
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
