'use client';

import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import { QuizIntroduction } from '@/app/components/quiz/QuizIntroduction';
import QuizProccess from '@/app/components/quiz/QuizProccess';
import axiosInstance from '@/app/lib/axios/instance';
import { Question, Quiz, QuizResponse } from '@/app/types/quiz';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { locale, quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const dummyQuestions: Question[] = [
    {
      id: '1',
      title: 'Question 1',
      answers: [
        { id: '1a', title: 'Answer A' },
        { id: '1b', title: 'Answer B' },
        { id: '1c', title: 'Answer C' },
        { id: '1d', title: 'Answer D' },
      ],
    },
    {
      id: '2',
      title: 'Question 2',
      answers: [
        { id: '2a', title: 'Answer A' },
        { id: '2b', title: 'Answer B' },
        { id: '2c', title: 'Answer C' },
        { id: '2d', title: 'Answer D' },
      ],
    },
    {
      id: '3',
      title: 'Question 3',
      answers: [
        { id: '3a', title: 'Answer A' },
        { id: '3b', title: 'Answer B' },
        { id: '3c', title: 'Answer C' },
        { id: '3d', title: 'Answer D' },
      ],
    },
    {
      id: '4',
      title: 'Question 4',
      answers: [
        { id: '4a', title: 'Answer A' },
        { id: '4b', title: 'Answer B' },
        { id: '4c', title: 'Answer C' },
        { id: '4d', title: 'Answer D' },
      ],
    },
    {
      id: '5',
      title: 'Question 5',
      answers: [
        { id: '5a', title: 'Answer A' },
        { id: '5b', title: 'Answer B' },
        { id: '5c', title: 'Answer C' },
        { id: '5d', title: 'Answer D' },
      ],
    },
    {
      id: '6',
      title: 'Question 6',
      answers: [
        { id: '6a', title: 'Answer A' },
        { id: '6b', title: 'Answer B' },
        { id: '6c', title: 'Answer C' },
        { id: '6d', title: 'Answer D' },
      ],
    },
    {
      id: '7',
      title: 'Question 7',
      answers: [
        { id: '7a', title: 'Answer A' },
        { id: '7b', title: 'Answer B' },
        { id: '7c', title: 'Answer C' },
        { id: '7d', title: 'Answer D' },
      ],
    },
    {
      id: '8',
      title: 'Question 8',
      answers: [
        { id: '8a', title: 'Answer A' },
        { id: '8b', title: 'Answer B' },
        { id: '8c', title: 'Answer C' },
        { id: '8d', title: 'Answer D' },
      ],
    },
    {
      id: '9',
      title: 'Question 9',
      answers: [
        { id: '9a', title: 'Answer A' },
        { id: '9b', title: 'Answer B' },
        { id: '9c', title: 'Answer C' },
        { id: '9d', title: 'Answer D' },
      ],
    },
    {
      id: '10',
      title: 'Question 10',
      answers: [
        { id: '10a', title: 'Answer A' },
        { id: '10b', title: 'Answer B' },
        { id: '10c', title: 'Answer C' },
        { id: '10d', title: 'Answer D' },
      ],
    },
  ];

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
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!quiz) return <div>No quiz found</div>;

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {isQuizStarted ? (
        <QuizProccess dummyQuestions={dummyQuestions} />
      ) : (
        <QuizIntroduction quiz={quiz} setIsQuizStarted={setIsQuizStarted} />
      )}
    </div>
  );
};

export default Page;
