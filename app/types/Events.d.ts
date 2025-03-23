import { Semester } from './academic-paths';

export interface EventDetails {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  start_date: string; // ISO date string
  semester_id: string;
  end_date: string; // ISO date string
  updated_at: string; // ISO date string
  created_at: string; // ISO date string
  deleted_at: string | null;
  semester: Semester;
}

export interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EventsData {
  data: EventDetails[];
  meta: MetaData;
}

export interface ApiResponse {
  data: EventsData;
  status: number;
  message: string;
}
