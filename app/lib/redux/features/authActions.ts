import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/instance";
import { endpoints } from "@/app/utils/endpoints";
import { deleteCookie } from "cookies-next";

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(endpoints.login, credentials);
      const { access_token, refresh_token, user } = response.data.data;

      //   // Store tokens in cookies
      //   Cookies.set("accessToken", access_token, {
      //     secure: true,
      //     sameSite: "strict",
      //   });
      //   Cookies.set("refreshToken", refresh_token, {
      //     secure: true,
      //     sameSite: "strict",
      //   });

      return { user, access_token, refresh_token };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axiosInstance.post(endpoints.refresh, {
        refresh_token: refreshToken,
      });

      const { access_token } = response.data.data;

      //   // Update access token in cookies
      //   Cookies.set("accessToken", access_token, {
      //     secure: true,
      //     sameSite: "strict",
      //   });

      // Update tokens and expiration
      localStorage.setItem("accessToken", access_token);

      return { access_token };
    } catch (error: any) {
      // Clear all auth data on refresh failure
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      deleteCookie("user");
      return rejectWithValue(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
  }
);
