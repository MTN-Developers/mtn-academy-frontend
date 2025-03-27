import useGetSemestersProgress from '@/app/hooks/useGetSemestersProgress';
import { UserSemester } from '@/app/types/semester';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ContinueLearningMob = ({ semesterDetails, isRTL, locale }) => {
  const { semesters, error, isLoading } = useGetSemestersProgress();

  const relatedSemester: UserSemester | undefined = semesters?.find(
    semester => semester.semester.id === semesterDetails.id,
  );
  // console.log('related', relatedSemester);

  if (isLoading) return <>loading...</>;

  if (error) {
    console.log('error', error);
    return null;
  }

  // If no related semester is found, don't render anything
  if (!relatedSemester) return null;

  return (
    <>
      {relatedSemester.last_video_course_slug && (
        <div className="md:hidden mb-4 block p-4 rounded-lg shadow-sm bg-white">
          <div className="flex items-center gap-4">
            <Image
              src={isRTL ? semesterDetails.image_url_ar : semesterDetails.image_url_en}
              alt={isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
              width={64}
              height={64}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-sm md:text-2xl font-bold text-[#10458c] break-words">
                {isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
              </h1>
            </div>
          </div>
          <Link className="w-full" href={`/${locale}/dashboard/course/${relatedSemester.last_video_course_slug}/watch`}>
            <Button className="w-full my-2 bg-[#07519C] text-lg h-14">
              {locale === 'en' ? 'Continue Learning' : 'تابع التعلم'}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ContinueLearningMob;
