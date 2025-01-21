// src/hooks/useCourses.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios/instance";

export const useCourses = () => {
  const getCourses = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/courses");
      return data;
    },
  });

  const createCourse = useMutation({
    mutationFn: async (courseData) => {
      const { data } = await axiosInstance.post("/courses", courseData);
      return data;
    },
  });

  return { getCourses, createCourse };
};
