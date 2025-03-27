// hooks/useAcademicPathDetails.ts
import { useQuery } from '@tanstack/react-query';
import { ApiPathResponse } from '../types/academic-paths';
import { academicPathsApi } from '../services/academicPaths';

export const useAcademicPathDetails = (slug: string) => {
  const { data, isLoading, error, refetch } = useQuery<ApiPathResponse, Error>({
    queryKey: ['academicPath', slug],
    queryFn: () => academicPathsApi.getAcademicPathBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // console.log("academicPath from hook is", data?.data);

  return {
    pathDetails: data?.data,
    isLoading,
    error,
    refetch,
  };
};
