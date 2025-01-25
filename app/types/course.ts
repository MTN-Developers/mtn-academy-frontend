// src/types/course.ts
export interface Course {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  about_ar: string | null;
  about_en: string | null;
  benefits_ar: string | null;
  benefits_en: string | null;
  logo_ar: string;
  logo_en: string;
  course_duration: number | null;
  banner_ar: string | null;
  banner_en: string | null;
  category: string;
  original_price: number;
  price_after_discount: number;
  type: string;
  erp_code: string | null;
  semester_id: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  semester: {
    id: string;
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    order: number;
    academic_study_path_id: string;
    updated_at: string;
    created_at: string;
    deleted_at: string | null;
  };
}

export interface CoursesMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CoursesResponse {
  data: {
    data: Course[];
    meta: CoursesMetadata;
  };
  status: number;
  message: string;
}
