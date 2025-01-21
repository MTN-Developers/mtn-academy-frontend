// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  permissions: string[]; // Add this if it's part of your user object
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SetCredentialsPayload {
  user: User | null;
  accessToken: string;
  refreshToken: string;
}
