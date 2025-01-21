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

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  permissions: [],
};

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (credentials) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.permissions = action.payload.user?.permissions || [];
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
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
