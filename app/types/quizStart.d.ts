// src/types/quizStart.ts

/** the raw “answer” object from the API */
export interface AnswerDetail {
  id: string;
  answer_ar: string;
  answer_en: string;
}

/** the raw “question” object from the API */
export interface QuestionDetail {
  id: string;
  question_ar: string;
  question_en: string;
  question_type: 'TF' | 'MSQ';
  answers: AnswerDetail[];
}

/** one entry in the user_questions array */
export interface UserQuestion {
  id: string;
  user_quiz_id: string;
  question_id: string;
  selected_answer_id: string | null;
  is_correct: boolean | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  question: QuestionDetail;
}

/** the data payload under “data” */
export interface StartQuizData {
  quiz_id: string;
  user_quiz_id: string;
  start_time: string;
  user_questions: UserQuestion[];
}

/** full JSON response from POST /quiz/:id/start */
export interface StartQuizResponse {
  data: StartQuizData;
  status: number;
  message: string;
}
