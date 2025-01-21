// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import { LoginCredentials } from "../types/auth";
import { login, logout } from "../lib/redux/features/authSlice";
// import { RootState, AppDispatch } from '@/lib/redux/store';
// import { login, logout } from '@/lib/redux/features/authSlice';
// import { LoginCredentials } from '@/types/auth';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) ?? false;
  };

  return {
    user,
    isAuthenticated,
    loading,
    login: handleLogin,
    logout: handleLogout,
    hasPermission,
  };
};
