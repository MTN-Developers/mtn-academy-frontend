// app/hooks/useCoursePlaylist.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios/instance";

interface Video {
  id: string;
  title_ar: string;
  title_en: string;
  duration: number;
  updated_at: string;
  created_at: string;
  deleted_at: null;
}

interface Chapter {
  id: string;
  videos: Video[];
  title_ar: string;
  title_en: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

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
    queryKey: ["coursePlaylist", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/course-playlist/course/slug/${slug}/videos`
      );
      console.log("course-playlist ", data);

      return data;
    },
  });
};
