import axios, { AxiosError, AxiosResponse } from "axios";

// Custom Error Interface তৈরি করুন
interface CustomError {
  message: string;
  status?: number;
  data?: unknown;
}

// Error throw করার ফাংশন
const createApiError = (
  message: string,
  status?: number,
  data?: unknown,
): CustomError => {
  return {
    message,
    status,
    data,
  };
};

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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = "সার্ভারে সমস্যা";

    if (error.code === "ECONNREFUSED") {
      errorMessage = "সার্ভার চালু নেই। Backend চালু করুন।";
    } else if (error.code === "NETWORK_ERROR") {
      errorMessage = "নেটওয়ার্ক সমস্যা";
    } else if (error.response) {
      // টাইপ সেফভাবে data access
      const responseData = error.response.data as { message?: string };
      errorMessage =
        responseData?.message || `সার্ভার এরর: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "সার্ভার রেসপন্স দেয়নি";
    }

    // Custom Error object তৈরি করুন
    const customError = createApiError(
      errorMessage,
      error.response?.status,
      error.response?.data,
    );

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
