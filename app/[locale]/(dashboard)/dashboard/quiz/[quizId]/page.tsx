'use client';

import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import { QuizIntroduction } from '@/app/components/quiz/QuizIntroduction';
import QuizProccess from '@/app/components/quiz/QuizProccess';
import axiosInstance from '@/app/lib/axios/instance';
import { Quiz, QuizResponse, UIQuestion } from '@/app/types/quiz';
import { StartQuizResponse, UserQuestion } from '@/app/types/quizStart';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const { locale, quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<UIQuestion[]>([]);
  const [userQuizId, setUserQuizId] = useState('');
  const [quizDuration, setQuizDuration] = useState(0);

  const initialSeconds = Number(quizDuration) * 60;
  const t = useTranslations('quiz');

  //handlers

  // helper to pick locale‐correct text
  function pickText(ar: string, en: string, locale: string) {
    return locale === 'ar' ? ar : en;
  }

  function mapUserQuestionToUI(uq: UserQuestion, locale): UIQuestion {
    return {
      id: uq.question.id,
      title: pickText(uq.question.question_ar, uq.question.question_en, locale),
      answers: uq.question.answers.map(ans => ({
        id: ans.id,
        title: pickText(ans.answer_ar, ans.answer_en, locale),
      })),
    };
  }

  // start quiz
  const startQuiz = async () => {
    try {
      const res = await axiosInstance.post<StartQuizResponse>(`/quiz/${quizId}/start`);
      toast.success('Quiz started');
      setUserQuizId(res.data.data.user_quiz_id);
      setIsQuizStarted(true);

      // map your UserQuestion[] → UIQuestion[]
      const uiQs = res.data.data.user_questions.map((uq: UserQuestion) => mapUserQuestionToUI(uq, locale));
      setQuestions(uiQs);
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to start quiz');
    }
  };

  //fetch quiz
  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get<QuizResponse>(`/quiz/${quizId}`);
        setQuiz(res?.data?.data);
        setQuizDuration(res?.data?.data.duration);
      } catch (error: any) {
        console.log(error);
        setError(error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!quiz) return <div>No quiz found</div>;

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-[50vh] flex items-center justify-center">
      {quiz.has_attended === true ? (
        <>
          <div className="p-6 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{t('Quiz Completed')}</h2>
            {/* <p className="mb-2">{result.message}</p> */}
            {/* <p>
              {t('Ended at')}: {new Date(result.ended_at).toLocaleString()}
            </p> */}
            {/* <p>
              {t('Total Questions')}: {quiz.grade}
            </p> */}
            {/* <p>
              {t('Correct Answers')}: {result.correctAnswers}
            </p> */}
            <p>
              {t('Score')}: {quiz.grade}
            </p>
            <p className={quiz?.grade && quiz?.grade >= quiz.pass_grade ? 'text-green-600' : 'text-red-600'}>
              {quiz?.grade && quiz.grade >= quiz.pass_grade ? `🎉 ${t('Passed!')}` : `❌ ${t('Failed')}`}
            </p>
          </div>
        </>
      ) : (
        <>
          {isQuizStarted ? (
            <QuizProccess
              questions={questions}
              userQuizId={userQuizId}
              quizId={quizId.toString()}
              initialTime={initialSeconds}
            />
          ) : (
            <QuizIntroduction quiz={quiz} setIsQuizStarted={setIsQuizStarted} startQuiz={startQuiz} />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
