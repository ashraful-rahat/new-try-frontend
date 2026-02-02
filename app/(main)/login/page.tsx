"use client";
import { Eye, EyeOff, Lock, LogIn, Mail, Shield, UserPlus } from "lucide-react";
import { useState } from "react";
import { useLogin } from "./login";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    handleLogin,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-red-50 to-green-100 p-4">
      <div className="absolute inset-0 bg-linear-to-br from-green-400/10 via-red-400/5 to-green-500/10"></div>

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
        <div className="relative h-32 bg-linear-to-r from-green-600 via-red-500 to-green-600 overflow-hidden">
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              স্বাগতম
            </h1>
            <p className="text-white/90 text-sm">আপনার একাউন্টে প্রবেশ করুন</p>
          </div>
        </div>

        <div className="p-8">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-green-600" />
                ইমেইল এড্রেস
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="আপনার ইমেইল দিন"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4 mr-2 text-red-500" />
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error / Success */}
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 font-medium">{success}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-green-600 via-green-500 to-red-500 hover:from-green-700 hover:via-green-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "লোড হচ্ছে..." : "লগইন করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 relative">
            <div className="border-t border-gray-300"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-sm text-gray-500">
              নতুন ব্যবহারকারী?
            </span>
          </div>

          {/* Register */}
          <a
            href="/register"
            className="w-full bg-linear-to-r from-red-500 via-red-400 to-green-500 hover:from-red-600 hover:via-red-500 hover:to-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
          >
            <UserPlus className="w-5 h-5" />
            নতুন একাউন্ট তৈরি করুন
          </a>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-linear-to-r from-green-50 to-red-50 border border-green-200/50 rounded-lg">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  নিরাপদ লগইন সিস্টেম
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  বাংলাদেশী স্ট্যান্ডার্ড অনুযায়ী আপনার তথ্য সুরক্ষিত
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
