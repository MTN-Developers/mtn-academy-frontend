import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/instance';
import { usePathname } from 'next/navigation';

export const useCourseRequest = () => {
  const path = usePathname();
  const isFromFreeStudy = path.includes('free-study');
  return useMutation({
    mutationFn: async (course_id: string) => {
      const { data } = await axiosInstance.post('/course-request', {
        course_id,
        course_type: isFromFreeStudy ? 'free_study' : 'academic_study',
      });
      return data;
    },
  });
};
