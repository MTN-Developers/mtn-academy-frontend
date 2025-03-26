// src/lib/redux/features/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/app/types/auth';
import { login, refreshAccessToken } from './authActions';
import { deleteCookie, setCookie } from 'cookies-next';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
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
        } else {
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
      state.loading = false;
      state.error = null;

      // Clear tokens and expiration
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpiry');

      // Delete cookies
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      deleteCookie('user');
      console.log('Delete Cookie from authSlice - 2');
    },
    setCredentials(state, action) {
      state.accessToken = action.payload.accessToken;

      // Only update refresh token if it's provided
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }

      // Only update user if it's provided
      if (action.payload.user) {
        state.user = action.payload.user;
      }
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
      });
  },
});

export const { logout, initializeAuthState, setCredentials } = authSlice.actions;
export default authSlice.reducer;
