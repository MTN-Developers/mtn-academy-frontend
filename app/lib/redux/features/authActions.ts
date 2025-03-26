import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/instance';

import { getCookie, setCookie } from 'cookies-next';
import { AxiosError } from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, credentials);
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
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.message;
        console.log('error', errorMessage);
      } else if (error instanceof Error) {
        console.log('error2 ', error);

        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const refreshAccessToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = getCookie('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      refresh_token: refreshToken,
    });

    const { access_token } = response.data.data;

    // Update access token in cookies
    setCookie('access_token', access_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Update tokens in localStorage
    localStorage.setItem('accessToken', access_token);

    return { access_token };
  } catch (error: any) {
    // Don't clear cookies here - only log the error
    console.error('Failed to refresh token:', error);

    let errorMessage = 'An unknown error occurred';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});
