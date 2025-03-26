// app/types/practicalEx.ts
export interface PracticalVideo {
  id: string;
  title_ar: string;
  title_en: string;
  video_url: string;
  duration: number;
  chapter_id: string;
  index: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  has_task: boolean;
  description_ar: string;
  description_en: string;
}

export interface PracticalChapter {
  id: string;
  title_ar: string;
  title_en: string;
  course_id: string;
  price: number | null;
  type: string;
  index: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  videos: PracticalVideo[];
}

export interface PracticalExDetailsResponse {
  data: PracticalChapter[];
  status: number;
  message: string;
}
