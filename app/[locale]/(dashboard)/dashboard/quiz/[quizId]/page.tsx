'use client';

import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import { QuizIntroduction } from '@/app/components/quiz/QuizIntroduction';
import axiosInstance from '@/app/lib/axios/instance';
import { Quiz, QuizResponse } from '@/app/types/quiz';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //fetch quiz
  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get<QuizResponse>(`/quiz/${quizId}`);
        setQuiz(res?.data?.data);
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
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!quiz) return <div>No quiz found</div>;

  return (
    <>
      <QuizIntroduction quiz={quiz} />
    </>
  );
};

export default Page;
