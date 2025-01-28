// hooks/useAcademicPaths.ts
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";
import { academicPathsApi } from "../services/academicPaths";
import { setPaths } from "../lib/redux/features/academicPathsSlice";
import { ApiResponse } from "../types/academic-paths";

export const useAcademicPaths = (page = 1, limit = 10) => {
  const dispatch = useDispatch();
  const { paths, meta } = useSelector(
    (state: RootState) => state.academicPaths
  );

  const { data, isLoading, error, refetch } = useQuery<ApiResponse, Error>({
    queryKey: ["academicPaths", page, limit],
    queryFn: () => academicPathsApi.getAcademicPaths(page, limit),
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      dispatch(setPaths({ paths: data.data.data, meta: data.data.meta }));
      return data;
    },
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
