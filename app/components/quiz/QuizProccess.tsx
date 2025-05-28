'use client';

import React, { FC, useState, useEffect } from 'react';
import { Question } from '@/app/types/quiz';

interface Props {
  dummyQuestions: Question[];
}

const QuizProccess: FC<Props> = ({ dummyQuestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(120); // seconds

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

  const question = dummyQuestions[currentIndex];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [question.id]: answerId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < dummyQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const handleSubmit = () => {
    // stop any running timer
    setTimeLeft(0);

    // here you’d POST selectedAnswers to your API…
    alert('Quiz finished!\n' + JSON.stringify(selectedAnswers, null, 2));
  };

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
            Question {currentIndex + 1} / {dummyQuestions.length}
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
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswers[question.id]}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {currentIndex < dummyQuestions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default QuizProccess;
