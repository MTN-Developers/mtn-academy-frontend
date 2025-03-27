import React from 'react';
import LearningStudyProgressCard from '../../common/LearningStudyProgressCard';
// import imagePlaceholder from '@/public/images/image-placeholder.svg';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/lib/redux/store';
import { useTranslations } from 'next-intl';
import useGetSemestersProgress from '@/app/hooks/useGetSemestersProgress';

const ContinueLearningComp = () => {
  const t = useTranslations('home');
  //get all progresses
  const { semesters, error, isLoading } = useGetSemestersProgress();

  const startedSemesters = semesters?.filter(semester => semester.is_locked === false);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.log('error', error);
    return null;
  }

  // console.log('semesters', semesters);

  return (
    <>
      {startedSemesters && startedSemesters?.length > 0 && (
        <div className="w-full max-w-[1005px]  lg:my-[60px] my-[20px] flex items-start justify-start   flex-col gap-4">
          <h1 className="text-2xl text-[#353535] font-bold text-start">{t('Continue learning')}</h1>
          {startedSemesters.map(
            semester => semester.last_video && <LearningStudyProgressCard key={semester.id} semester={semester} />,
          )}
        </div>
      )}
    </>
  );
};

export default ContinueLearningComp;
