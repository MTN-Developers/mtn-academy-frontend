// app/types/assignment.ts
export interface Answer {
  id: string;
  user_id: string;
  question_id: string;
  answer: string;
  feedback: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export interface QuestionData {
  id: string;
  video_id: string;
  question: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  answer: Answer | null;
}

export interface ApiResponse {
  data: QuestionData[];
  status: number;
  message: string;
}
