// services/academicPaths.ts
import axiosInstance from "../lib/axios/instance";
import { ApiPathResponse, ApiResponse } from "../types/academic-paths";

export const academicPathsApi = {
  getAcademicPaths: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get<ApiResponse>(
      `/academic-study-paths?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  //

  getAcademicPathBySlug: async (slug: string): Promise<ApiPathResponse> => {
    const response = await axiosInstance.get<ApiPathResponse>(
      `/academic-study-paths/slug/${slug}`
    );


    return response.data;
  },
};
