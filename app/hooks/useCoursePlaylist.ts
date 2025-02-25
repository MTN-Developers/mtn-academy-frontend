// app/hooks/useCoursePlaylist.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/instance';
import { Chapter } from '../types/video';

interface PlaylistData {
  id: string;
  title_ar: string;
  title_en: string;
  updated_at: string;
  created_at: string;
  deleted_at: null;
  chapters: Chapter[];
}

interface PlaylistResponse {
  data: PlaylistData[];
  status: number;
  message: string;
}

export const useCoursePlaylist = (slug: string) => {
  return useQuery<PlaylistResponse>({
    queryKey: ['coursePlaylist', slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/course-playlist/course/slug/${slug}/videos`);
      console.log('course-playlist ', data);

      return data;
    },
  });
};
