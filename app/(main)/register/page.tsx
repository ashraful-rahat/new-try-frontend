"use client";
import { ArrowRight, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRegister } from "./register";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
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
  } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-green-50 to-red-100 p-4">
      <div className="absolute inset-0 bg-linear-to-br from-red-400/10 via-green-400/10 to-red-500/10"></div>

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
        <div className="relative h-32 bg-linear-to-r from-red-500 via-green-600 to-red-500 overflow-hidden">
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              একাউন্ট তৈরি করুন
            </h1>
            <p className="text-white/90 text-sm">কয়েকটি সহজ ধাপে যুক্ত হোন</p>
          </div>
        </div>

        <div className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="space-y-6"
          >
            {/* Email */}
            <input
              type="email"
              placeholder="আপনার ইমেইল দিন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
              required
            />

            {/* Password */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="শক্তিশালী পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg"
              required
            />

            {/* Confirm Password */}
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="পুনরায় পাসওয়ার্ড দিন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg"
              required
            />

            {/* Messages */}
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 font-medium">{success}</p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-green-600 via-green-500 to-red-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              {loading ? "লোড হচ্ছে..." : "একাউন্ট তৈরি করুন"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
