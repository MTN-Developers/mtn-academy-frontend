import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/instance';
import { deleteCookie } from 'cookies-next';
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
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      refresh_token: refreshToken,
    });

    const { access_token } = response.data.data;

    //   // Update access token in cookies
    //   Cookies.set("accessToken", access_token, {
    //     secure: true,
    //     sameSite: "strict",
    //   });

    // Update tokens and expiration
    localStorage.setItem('accessToken', access_token);

    return { access_token };
  } catch (error: any) {
    // Clear all auth data on refresh failure
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    deleteCookie('user');
    console.log('Delete Cookie from authSlice');
    let errorMessage = 'An unknown error occurred';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});
