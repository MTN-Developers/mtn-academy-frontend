// src/lib/redux/features/authSlice.ts
import {
  AuthResponse,
  AuthState,
  LoginCredentials,
  RefreshTokenResponse,
  SetCredentialsPayload,
} from "@/app/types/auth";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/instance";
import Cookies from "js-cookie";
import { endpoints } from "@/app/utils/endpoints";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  permissions: [],
};

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  endpoints.login,
  async (credentials) => {
    const response = await axiosInstance.post<AuthResponse>(
      endpoints.login,
      credentials
    );
    return response.data;
  }
);

export const refreshAccessToken = createAsyncThunk<
  RefreshTokenResponse,
  string
>("auth/refreshToken", async (refreshToken) => {
  const response = await axiosInstance.post<RefreshTokenResponse>(
    "/auth/refresh",
    { refreshToken }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.permissions = [];

      // Clear both localStorage and cookies
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.permissions = action.payload.user?.permissions || [];

      // Set both localStorage and cookies
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      Cookies.set("accessToken", action.payload.accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", action.payload.refreshToken, {
        secure: true,
        sameSite: "strict",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.loading = false;
        state.permissions = action.payload.user?.permissions || [];

        // Set both localStorage and cookies
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        Cookies.set("accessToken", action.payload.accessToken, {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("refreshToken", action.payload.refreshToken, {
          secure: true,
          sameSite: "strict",
        });
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        Cookies.set("accessToken", action.payload.accessToken, {
          secure: true,
          sameSite: "strict",
        });
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
