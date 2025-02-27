// types/video.ts
export interface Video {
  id: string;
  index: number;
  duration: number;
  has_task: boolean;
  title_ar: string;
  title_en: string;
  video_url: string;
  created_at: string;
  deleted_at: null;
  updated_at: string;
  description_ar: string | null;
  description_en: string | null;
}

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
  videos: Video[] | null;
}

export interface Course {
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
  semester_id: string;
}
