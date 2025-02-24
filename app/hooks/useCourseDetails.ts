// app/hooks/useCourseDetails.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/instance';

export interface Chapter {
  id: string;
  title_ar: string;
  title_en: string;
  price: null;
  type: string;
  index: number;
  updated_at: string;
  created_at: string;
  deleted_at: null;
  is_locked: boolean;
}

export interface CourseDetails {
  data: {
    id: string;
    name_ar: string;
    name_en: string;
    slug: string;
    description_ar: string;
    description_en: string;
    chapters: Chapter[];
    about_ar: string | null;
    about_en: string | null;
    benefits_ar: string | null;
    benefits_en: string | null;
    course_duration: string | null;
    logo_ar: string;
    logo_en: string;
    banner_ar: string | null;
    banner_en: string | null;
    type: string;
    promotion_video_url: string | null;
    sub_courses: any[];
  };
  status: number;
  message: string;
}

export const useCourseDetails = (slug: string) => {
  return useQuery<CourseDetails>({
    queryKey: ['courseDetails', slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/course/slug/${slug}`);
      return data;
    },
  });
};
