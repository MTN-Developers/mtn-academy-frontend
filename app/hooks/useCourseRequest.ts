import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/instance';

export const useCourseRequest = () => {
  return useMutation({
    mutationFn: async (course_id: string) => {
      const { data } = await axiosInstance.post('/course-request', { course_id });
      return data;
    },
  });
};
