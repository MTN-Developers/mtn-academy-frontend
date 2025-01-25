// src/components/common/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { initializeAuthState } from "@/app/lib/redux/features/authSlice";
import { useAppDispatch } from "@/app/lib/redux/store";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuthState());
  }, [dispatch]);

  return <>{children}</>;
}
