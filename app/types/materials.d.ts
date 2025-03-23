interface Material {
  id: string;
  course_id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  file_en: string;
  file_ar: string;
  updated_at: string; // ISO date string
  created_at: string; // ISO date string
  deleted_at: string | null;
}

interface MaterialsResponse {
  data: Material[];
  status: number;
  message: string;
}
