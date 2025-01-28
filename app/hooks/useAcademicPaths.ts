// hooks/useAcademicPaths.ts
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../lib/redux/store";
import {
  setError,
  setLoading,
  setPaths,
} from "../lib/redux/features/academicPathsSlice";
import { academicPathsApi } from "../services/academicPaths";
import { ApiResponse } from "../types/academic-paths";

export const useAcademicPaths = (page = 1, limit = 10) => {
  const dispatch = useDispatch();
  const { paths, meta, isLoading, error } = useSelector(
    (state: RootState) => state.academicPaths
  );

  // Create the query function
  const fetchAcademicPaths = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await academicPathsApi.getAcademicPaths(page, limit);
      dispatch(
        setPaths({
          paths: response.data.data,
          meta: response.data.meta,
        })
      );
      dispatch(setError(null));
      return response;
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : "An error occurred")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, page, limit]);

  const { data, refetch } = useQuery<ApiResponse>({
    queryKey: ["academicPaths", page, limit],
    queryFn: fetchAcademicPaths,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    paths,
    meta,
    isLoading,
    error,
    refetch,
    rawData: data,
  };
};
