// src/app/hooks/useCourses.ts
import { useAppSelector } from "@/app/lib/redux/store";

export const useCourses = () => {
  const {
    items: courses,
    status,
    error,
    metadata,
  } = useAppSelector((state) => state.courses);

  const isLoading = status === "loading";
  const isError = status === "failed";
  const isSuccess = status === "succeeded";

  return {
    courses,
    isLoading,
    isError,
    isSuccess,
    error,
    metadata,
  };
};
