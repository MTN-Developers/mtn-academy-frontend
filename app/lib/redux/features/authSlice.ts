// src/lib/redux/features/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/instance";
import { endpoints } from "@/app/utils/endpoints";
import Cookies from "js-cookie";
import { User } from "@/app/types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(endpoints.login, credentials);
      const { access_token, refresh_token, user } = response.data.data;

      // Store tokens in cookies
      Cookies.set("accessToken", access_token, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", refresh_token, {
        secure: true,
        sameSite: "strict",
      });

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
      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axiosInstance.post(endpoints.refresh, {
        refresh_token: refreshToken,
      });

      const { access_token } = response.data.data;

      // Update access token in cookies
      Cookies.set("accessToken", access_token, {
        secure: true,
        sameSite: "strict",
      });

      return { access_token };
    } catch (error: any) {
      // Clear all auth data on refresh failure
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return rejectWithValue(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuthState(state) {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (accessToken && refreshToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, initializeAuthState } = authSlice.actions;
export default authSlice.reducer;
