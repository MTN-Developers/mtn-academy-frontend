'use client';
// src/lib/axios/instance.ts
import axios, { InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { store } from '../redux/store'; // Import your Redux store

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    if (config.headers) config.headers['Authorization'] = `Bearer ${getCookie('access_token')}`;
    return config;
  },
  function (error: unknown) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
      // Refresh Token is Expired
      if (error?.response?.data?.requiresLogin === true) {
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        deleteCookie('user');
        console.log('Redirecting to login page 2');
        window.location.href = '/login';
        return Promise.reject(new Error('Requires login'));
      } else {
        try {
          // Mark this request as retried
          originalRequest._retry = true;

          // Refresh Token Not Expired
          const refreshToken = getCookie('refresh_token');

          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token } = response.data.data;

          // Update cookies
          setCookie('access_token', access_token, { path: '/' });

          // Update Redux store with new token
          store.dispatch({
            type: 'auth/setCredentials',
            payload: {
              accessToken: access_token,
              refreshToken: refreshToken,
            },
          });

          // Update localStorage if you're using it
          localStorage.setItem('accessToken', access_token);

          // Update the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);

          // Only clear tokens if refresh actually failed
          deleteCookie('access_token');
          deleteCookie('refresh_token');
          deleteCookie('user');

          // Redirect to login
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
