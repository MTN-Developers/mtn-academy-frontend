'use client';

import axiosInstance from '@/app/lib/axios/instance';
import { UIQuestion } from '@/app/types/quiz';
import { EndQuizResponse } from '@/app/types/quizEnd';
import { useTranslations } from 'next-intl';
import React, { FC, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
  questions: UIQuestion[];
  userQuizId: string;
  quizId: string;
  initialTime: number;
}

const QuizProccess: FC<Props> = ({ questions, quizId, initialTime, userQuizId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(initialTime); // seconds
  const [result, setResult] = useState<EndQuizResponse['data'] | null>(null);
  const t = useTranslations('quiz');

  // start countdown
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const question = questions[currentIndex];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [question.id]: answerId,
    }));
  };

  // PATCH a single answer
  const submitAnswer = async () => {
    const ansId = selectedAnswers[question.id];
    return axiosInstance.patch(`/user-quiz/${userQuizId}/answer`, {
      question_id: question.id,
      selected_answer_id: ansId,
    });
  };

  // on Next / Submit click
  const handleNext = async () => {
    if (!selectedAnswers[question.id]) return;

    try {
      await submitAnswer();
      // if more questions remain → advance
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        // last question → close out
        await handleSubmit();
        toast.success('Quiz completed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit answer');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  // finalize quiz
  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.patch<EndQuizResponse>(`/quiz/${quizId}/end`);
      setResult(res.data.data);
    } catch (err) {
      console.error(err);
      alert('Failed to end quiz');
    }
  };

  // if we already have a result → show summary UI
  if (result) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">{t('Quiz Completed')}</h2>
        <p className="mb-2">{result.message}</p>
        <p>
          {t('Ended at')}: {new Date(result.ended_at).toLocaleString()}
        </p>
        <p>
          {t('Total Questions')}: {result.totalQuestions}
        </p>
        <p>
          {t('Correct Answers')}: {result.correctAnswers}
        </p>
        <p>
          {t('Score')}: {result.grade}
        </p>
        <p className={result.isPassed ? 'text-green-600' : 'text-red-600'}>
          {result.isPassed ? `🎉 ${t('Passed!')}` : `❌ ${t('Failed')}`}
        </p>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="p-4 my-10 max-w-3xl mx-auto">
      {/* header */}

      <div className="flex items-center justify-between">
        <h1 className="text-sky-800 text-2xl font-medium">Chose the Correct answer</h1>
        <div>
          {/* Timer */}
          <div className="text-right text-lg text-green-800 font-medium mb-1">
            Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
          {/* Progress */}
          <div className=" text-sm text-gray-600">
            Question {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold mb-4">{question.title}</h2>

      {/* Answers */}
      <ul className="space-y-2 mb-6">
        {question.answers.map(ans => (
          <li key={ans.id}>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={question.id}
                value={ans.id}
                checked={selectedAnswers[question.id] === ans.id}
                onChange={() => handleAnswerSelect(ans.id)}
                className="form-radio"
              />
              <span>{ans.title}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Prev / Next */}
      <div className="flex w-full  justify-end gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          {t('Next')}
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswers[question.id]}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {currentIndex < questions.length - 1 ? t('Next') : t('Submit')}
        </button>
      </div>
    </div>
  );
};

export default QuizProccess;
