// app/components/ui/course/AssignmentView.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { getLangDir } from 'rtl-detect';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import axiosInstance from '@/app/lib/axios/instance';
import useGetAssigmentWithAnswers from '@/app/hooks/useGetAssigmentWithAnswers';
import { toast } from 'sonner';
import { QuestionData } from '@/app/types/assigment';

interface AssignmentViewProps {
  videoId: string;
}

export function AssignmentView({ videoId }: AssignmentViewProps) {
  const { locale } = useParams();
  const isRTL = getLangDir(locale as string) === 'rtl';
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  const { data: questions, isLoading, refetch } = useGetAssigmentWithAnswers({ videoId });

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleSubmit = async (questionId: string) => {
    const answer = answers[questionId];
    if (!answer || getWordCount(answer) < 5) {
      toast.error('Your answer must be at least 5 words.');
      return;
    }

    setIsSubmitting(prev => ({ ...prev, [questionId]: true }));

    try {
      await axiosInstance.post(`/video-assignment/answer`, {
        question_id: questionId,
        answer: answer,
      });

      toast.success('Your answer has been submitted successfully.');

      // Refetch questions to get updated data
      refetch();

      // Clear the answer field
      setAnswers(prev => ({
        ...prev,
        [questionId]: '',
      }));
    } catch (error) {
      console.log('error', error);
      toast.error('Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(prev => ({ ...prev, [questionId]: false }));
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading assignment questions...</div>;
  }

  if (!questions || questions.length === 0) {
    return <div className="p-8 text-center">No assignment questions available for this video.</div>;
  }

  return (
    <div className="w-full p-4 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">{isRTL ? 'التطبيق' : 'Assignment'}</h1>

      {questions.map((question: QuestionData) => (
        <div key={question.id} className="mb-8 p-4   rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{question.question}</h2>

          {question.answer ? (
            // If answer exists, show it
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">{isRTL ? 'إجابتك:' : 'Your Answer:'}</h3>
              <p className="whitespace-pre-wrap">{question.answer.answer}</p>
              <div className="text-sm text-gray-500 mt-2">
                {isRTL ? 'تم التقديم في:' : 'Submitted on:'} {new Date(question.answer.created_at).toLocaleString()}
              </div>

              {question.answer.feedback && (
                <div className="mt-4 border-t pt-3">
                  <h3 className="font-medium text-gray-700 mb-2">{isRTL ? 'ملاحظات:' : 'Feedback:'}</h3>
                  <p className="whitespace-pre-wrap text-gray-700">{question.answer.feedback}</p>
                </div>
              )}
            </div>
          ) : (
            // If no answer, show the form
            <div>
              <Textarea
                placeholder={isRTL ? 'اكتب إجابتك هنا...' : 'Write your answer here...'}
                className="min-h-[200px] mb-2"
                value={answers[question.id] || ''}
                onChange={e => handleAnswerChange(question.id, e.target.value)}
              />

              <div className="flex justify-between mb-4 text-sm text-gray-500">
                <span>{isRTL ? 'يجب أن تكون الإجابة أكثر من 5 كلمة' : 'Answer must be more than 5 words'}</span>
                <span>
                  {getWordCount(answers[question.id] || '')} {isRTL ? 'كلمة' : 'words'}
                </span>
              </div>

              <Button
                onClick={() => handleSubmit(question.id)}
                disabled={isSubmitting[question.id] || getWordCount(answers[question.id] || '') < 5}
                className="w-full md:w-auto bg-blue-500 float-right"
              >
                {isSubmitting[question.id]
                  ? isRTL
                    ? 'جاري التقديم...'
                    : 'Submitting...'
                  : isRTL
                  ? 'تقديم الإجابة'
                  : 'Submit answer'}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
