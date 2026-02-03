import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || localStorage.getItem("adminToken");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.log("Request Error:", error.message);
    return Promise.reject(error);
  },
);

// Response interceptor - SIMPLIFIED VERSION
axiosInstance.interceptors.response.use(
  (response) => {
    // শুধু সফল রেসপন্স রিটার্ন করুন
    return response;
  },
  (error) => {
    // Error handle করুন
    let errorMessage = "সার্ভারে সমস্যা";

    if (error.code === "ECONNREFUSED") {
      errorMessage = "সার্ভার চালু নেই। Backend চালু করুন।";
    } else if (error.code === "NETWORK_ERROR") {
      errorMessage = "নেটওয়ার্ক সমস্যা";
    } else if (error.response) {
      // সার্ভার রেসপন্স দিয়েছে
      errorMessage =
        error.response.data?.message || `সার্ভার এরর: ${error.response.status}`;
    } else if (error.request) {
      // রিকুয়েস্ট পাঠানো হয়েছে কিন্তু রেসপন্স আসেনি
      errorMessage = "সার্ভার রেসপন্স দেয়নি";
    }

    // Error object create করুন
    const customError = new Error(errorMessage);

    customError.status = error.response?.status;

    customError.data = error.response?.data;

    // Development mode তে শুধু log দেখান
    if (process.env.NODE_ENV === "development") {
      console.log("API Error Info:", {
        message: errorMessage,
        status: error.response?.status,
        url: error.config?.url,
      });
    }

    return Promise.reject(customError);
  },
);

export default axiosInstance;
