import { Quiz } from '@/app/types/quiz';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';
import { TbSquareRoundedCheckFilled } from 'react-icons/tb';

type Props = {
  quiz: Quiz;
  setIsQuizStarted: (v: boolean) => void;
  startQuiz: () => void;
};

export const QuizIntroduction = ({ quiz, startQuiz }: Props) => {
  const { locale } = useParams();
  const t = useTranslations('quiz');

  //handlers

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const day = d.getDate(); // 1–31
    const month = d.getMonth() + 1; // 0–11 → 1–12
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="w-full flex items-center p-4 lg:px-52 lg:py-10 justify-center flex-col gap-4">
      <h1 className="text-neutral-900 text-3xl lg:text-4xl w-full text-start font-normal">
        {locale === 'ar' ? quiz.title_ar : quiz.title_en}
      </h1>
      <p className="w-full text-start text-neutral-700 text-xl lg:text-2xl ">{t('Test description')}</p>
      <p className="text-neutral-700 text-start w-full lg:text-xl">
        {locale === 'ar' ? quiz.description_ar : quiz.description_en}
      </p>
      <p className="w-full text-start text-neutral-700 text-xl lg:text-2xl ">{t('Assignment Roles and Cautious')} </p>
      <p className="text-neutral-700 text-start w-full lg:text-xl">{locale === 'ar' ? quiz.roles_ar : quiz.roles_en}</p>
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="flex my-4 items-center gap-2">
            <span className="text-gray-400 text-xl">
              <TbSquareRoundedCheckFilled />
            </span>
            {t('Not Submitted yet')}
          </p>
          <p className="text-slate-500 my-4 text-sm font-normal">
            {formatDate(quiz.start_date)} – {formatDate(quiz.end_date)}
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              startQuiz();
            }}
            className="bg-[#07519c] py-2 px-4 text-sm lg:text-lg text-nowrap  lg:py-4 lg:px-8 text-white rounded-lg"
          >
            {t('start quiz')}
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-400 h-[1px]"></div>
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="flex my-4 items-center gap-2">{t('Receive grade')}</p>
          <p className="text-slate-500 my-4 text-sm font-normal">
            {t('Success limit')}: {quiz.pass_grade}
          </p>
        </div>
        <div className="flex items-center gap-4 flex-col">
          <p className="font-bold">{t('Your grade')}</p>
          <p className="font-bold">-</p>
        </div>
      </div>
    </div>
  );
};
