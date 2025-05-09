// types/semester.ts
export interface Course {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  about_ar: string | null;
  about_en: string | null;
  benefits_ar: string | null;
  benefits_en: string | null;
  logo_ar: string;
  logo_en: string;
  course_duration: string | null;
  promotion_video_url: string | null;
  banner_ar: string | null;
  banner_en: string | null;
  type: string;
  erp_code: string | null;
  semester_id: string;
  parent_id: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  is_completed: true;
  is_unlocked: true;
}

export interface SemesterDetails {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  is_locked: boolean;
  order?: number;
  image_url_ar: string;
  image_url_en: string;
  academic_study_path_id?: string;
  updated_at?: string;
  created_at?: string;
  deleted_at?: string | null;
  courses: Course[] | [];
  price: number;
  price_after_discount: number;
  promotion_video_url?: string | null;
  is_purchased: boolean;
}

export interface ApiSemesterResponse {
  data: SemesterDetails;
  status: number;
  message: string;
}

export interface Semester {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  image_url_ar: string;
  image_url_en: string;
  promotion_video_url: string;
  price: number;
  price_after_discount: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export interface UserSemester {
  id: string;
  user_id: string;
  semester_id: string;
  is_locked: boolean;
  is_completed: boolean;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  semester: Semester;
  total_videos: number;
  total_watched_videos: number;
  watched_percentage: number;
  last_video: string;
  last_video_course_ar: string;
  last_video_course_en: string;
  last_video_title_ar: string;
  last_video_title_en: string;
  last_video_course_slug: string;
}
