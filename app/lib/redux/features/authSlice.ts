// src/lib/redux/features/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/app/types/auth';
import { login, refreshAccessToken } from './authActions';
import { deleteCookie, setCookie } from 'cookies-next';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  // isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  // isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuthState(state) {
      const accessToken = localStorage.getItem('accessToken');
      const tokenExpiry = localStorage.getItem('tokenExpiry');

      if (accessToken && tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry);
        if (expiryTime > Date.now()) {
          state.accessToken = accessToken;
          // state.isAuthenticated = true;
        } else {
          // Token has expired
          // state.isAuthenticated = false;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('tokenExpiry');
        }
      }
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      // state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clear tokens and expiration
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpiry');

      // Delete cookies
      deleteCookie('access_token');
      deleteCookie('refresh_token');

      // Delete cookies
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('user');
      console.log('Delete Cookie from authSlice - 2');
    },
    setCredentials(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      // state.user = action.payload.user;
      // state.isAuthenticated = !!action.payload.accessToken;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        // state.isAuthenticated = true;
        state.error = null;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);

        // Store tokens in cookies
        setCookie('accessToken', action.payload.access_token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        setCookie('refreshToken', action.payload.refresh_token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        // state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, state => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        // state.isAuthenticated = false;
      });
  },
});

export const { logout, initializeAuthState } = authSlice.actions;
export default authSlice.reducer;
