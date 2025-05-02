import React from 'react';

import { SemesterDetails } from '@/app/types/semester';
import SemesterCard from '../../common/CourseCard';
import { useTranslations } from 'next-intl';

interface IProps {
  semesters: SemesterDetails[];
  direction: string;
}

const FreeStudiesComp = ({ semesters, direction }: IProps) => {
  const t = useTranslations('home');

  return (
    <div>
      <h2 className="text-[#353535]  lg:text-[40px] my-4 font-semibold leading-[45px]">
        {t('Get starts with MTN Institute studies')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {semesters.length > 0 &&
          semesters.map(semester => <SemesterCard key={semester.id} semester={semester} direction={direction} />)}
      </div>
    </div>
  );
};

export default FreeStudiesComp;
