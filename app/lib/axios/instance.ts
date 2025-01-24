// src/lib/axios/instance.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { store } from "../redux/store";
import { logout } from "../redux/features/authSlice";
import { ApiErrorResponseData } from "@/app/types/auth";

interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (error: Error) => void;
}

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    if (typeof window === "undefined") {
      // Server-side requests
      return config;
    } else {
      // Client-side requests
      const accessToken = getCookie("accessToken");
      if (accessToken && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    }
  },
  function (error: unknown) {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponseData>) => {
    const originalRequest = error.config as RetryConfig;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      // Check if requires login
      if (error.response?.data?.requiresLogin === true) {
        // Clear auth data
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        store.dispatch(logout());

        // Redirect to login if not already there
        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(new Error("Authentication required"));
      }

      // Handle token refresh
      if (isRefreshing) {
        try {
          const token = await new Promise<string | null>((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string | null) => resolve(token),
              reject: (error: Error) => reject(error),
            });
          });

          if (token && originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          }
          throw new Error("No token received");
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axiosInstance.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const { access_token } = response.data.data;
        
        // Update tokens
        setCookie("accessToken", access_token);
        
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        }
        
        processQueue(null, access_token);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        
        // Clear auth data
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        store.dispatch(logout());

        // Redirect to login
        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
