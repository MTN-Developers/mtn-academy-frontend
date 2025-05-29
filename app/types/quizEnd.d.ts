// src/types/quizEnd.ts
export interface EndQuizData {
  message: string;
  ended_at: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  isPassed: boolean;
}

export interface EndQuizResponse {
  data: EndQuizData;
  status: number;
  message: string;
}
