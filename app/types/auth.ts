// src/types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  project_name: string | null;
  reset_token: string | null;
  reset_token_expires: string | null;
  reset_token_tries: number;
  refresh_token: string | null;
  role: string;
  role_id: string | null;
  gender: "male" | "female";
  stripe_customer_id: string | null;
  last_feedback_at: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  permissions: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
  user: User;
}

// Remove empty interface and use type instead
export type AuthResponse = ApiResponse<AuthResponseData>;

export interface RefreshTokenResponse {
  access_token: string;
}

export interface SetCredentialsPayload {
  user: User | null;
  accessToken: string;
  refreshToken: string;
}

export interface ApiErrorResponse {
  data: null;
  status: number;
  message: string;
}

export interface ApiErrorResponseData {
  requiresLogin: boolean;
  message: string;
  status: number;
  data: any;
}

// Update custom error type
export class ApiError extends Error {
  constructor(public response: ApiErrorResponseData) {
    super(response.data.message);
    this.name = "ApiError";
  }
}

export interface GetCurrentUserResponse {
  user: User;
}

// Update ApiResponse to be more flexible
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiErrorResponse extends ApiResponse<null> {
  requiresLogin: boolean;
  message: string;
  status: number;
}
