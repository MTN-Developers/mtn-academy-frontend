// app/hooks/useCourseDetails.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/instance';
import { setCourse } from '../lib/redux/features/courseBySlugSlice';
import { useAppDispatch } from '../lib/redux/store';
import { Course } from '../types/video';

export interface CourseDetailsResponse {
  data: Course;
  status: number;
  message: string;
}

export const useCourseDetails = (slug: string, options?: { enabled?: boolean }) => {
  const dispatch = useAppDispatch();
  return useQuery<CourseDetailsResponse>({
    queryKey: ['courseDetails', slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/course/slug/${slug}`);
      return data;
    },
    enabled: options?.enabled !== false, // Enable by default unless explicitly disabled
  });
};
