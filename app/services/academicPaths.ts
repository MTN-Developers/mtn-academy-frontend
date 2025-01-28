// services/academicPaths.ts
import axiosInstance from "../lib/axios/instance";
import { ApiResponse } from "../types/academic-paths";

export const academicPathsApi = {
  getAcademicPaths: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get<ApiResponse>(
      `/academic-study-paths?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};
