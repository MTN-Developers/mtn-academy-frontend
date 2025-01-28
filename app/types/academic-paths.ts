// types/academic-paths.ts
export interface AcademicPath {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  image_url_ar: string;
  image_url_en: string;
  price: number;
  price_after_discount: number;
  code: string;
  languages: string[];
  who_should_join_ar: string | null;
  who_should_join_en: string | null;
  promotion_video_url: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  semesters: any[]; // Define proper type if needed
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse {
  data: {
    data: AcademicPath[];
    meta: PaginationMeta;
  };
  status: number;
  message: string;
}
