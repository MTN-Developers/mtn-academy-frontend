// hooks/useSemesterDetails.ts
import { useQuery } from "@tanstack/react-query";
import { ApiSemesterResponse } from "../types/semester";
import axiosInstance from "../lib/axios/instance";

export const useSemesterDetails = (slug: string) => {
  return useQuery<ApiSemesterResponse, Error>({
    queryKey: ["semester", slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/semesters/slug/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });
};
