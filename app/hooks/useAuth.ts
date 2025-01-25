// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import { logout } from "../lib/redux/features/authSlice";
import { toast } from "sonner";
import { login } from "../lib/redux/features/authActions";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const loginFn = async (credentials: LoginCredentials) => {
    try {
      const result = await dispatch(
        login({
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

      return result;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(`invalid credintials`);
      return false;
    }
  };

  const logoutFn = () => {
    dispatch(logout());
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("email");
  };

  return {
    user,
    loading,
    loginFn,
    logoutFn,
  };
};
