// src/types/quiz.ts

export interface QuizConfig {
  id: string;
  quiz_id: string;
  question_type: string;
  question_count: number;
  question_grade: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Quiz {
  id: string;
  semester_id: string;
  start_date: string;
  end_date: string;
  duration: number;
  total_grade: number;
  pass_grade: number;
  created_at: string;
  updated_at: string;
  configs: QuizConfig[];
  deleted_at: string | null;
  title_ar: string;
  title_en: string;
  description_en: string;
  description_ar: string;
  roles_ar: string;
  roles_en: string;
  has_attended: boolean;
}

export interface QuizResponse {
  data: Quiz;
  status: number;
  message: string;
}

export interface UIAnswer {
  id: string;
  title: string;
}

export interface UIQuestion {
  id: string;
  title: string;
  answers: UIAnswer[];
}
