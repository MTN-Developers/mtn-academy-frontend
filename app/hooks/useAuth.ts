// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import {
  login as loginAction,
  logout as logoutAction,
} from "../lib/redux/features/authSlice";
import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (credentials: LoginCredentials) => {
    try {
      const _result = await dispatch(
        loginAction({
          email: credentials.email,
          password: credentials.password,
        })
      ).unwrap();

      // Handle remember me
      if (credentials.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", credentials.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
      }

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(`invalid credintials`);
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("email");
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };
};
