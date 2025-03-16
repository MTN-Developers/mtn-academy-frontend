import useGetSemestersProgress from '@/app/hooks/useGetSemestersProgress';
import { UserSemester } from '@/app/types/semester';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import React from 'react';
import lovely from '@/public/icons/lovely.svg';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  semesterId: string;
}

const ProgressSidebar = ({ semesterId }: IProps) => {
  const params = useParams();
  const locale = params.locale as string;

  const { semesters, error, isLoading } = useGetSemestersProgress();

  // Find the related semester (returns a single object or undefined)
  const relatedSemester: UserSemester | undefined = semesters?.find(semester => semester.semester.id === semesterId);

  if (isLoading) return <>loading...</>;

  if (error) {
    console.log('error', error);
    return null;
  }

  // If no related semester is found, don't render anything
  if (!relatedSemester) return null;

  // Calculate the progress percentage
  const progressPercentage =
    relatedSemester.total_videos > 0
      ? Math.round((relatedSemester.total_watched_videos / relatedSemester.total_videos) * 100)
      : 0;

  // Calculate the stroke-dashoffset for the SVG circle
  const circumference = 2 * Math.PI * 45; // 2πr where r=45
  const dashOffset = circumference * (1 - progressPercentage / 100);

  return (
    <div className="bg-white hidden  h-fit p-4 md:p-6 rounded-lg my-4 shadow-sm lg:flex flex-col gap-4 items-center">
      <div className="w-full text-center">
        <h3 className="text-lg font-semibold text-[#353535] mb-4">{locale === 'en' ? 'You Completed' : 'متابعة'}</h3>

        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="55"
              className="stroke-current text-gray-200"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="55"
              className="stroke-current text-[#10B981]"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#10B981]">{progressPercentage}%</span>
          </div>
        </div>

        <p className="text-sm text-[#454545] mb-4 flex items-center justify-center gap-4">
          {locale === 'en' ? 'Enjoy your learning' : 'استمتع برحلتك في التعلم'}
          <Image src={lovely} alt={'heart'} />
        </p>
        <Link href={`/${locale}/dashboard/course/${relatedSemester.last_video_course_slug}/watch`}>
          <Button className="w-full bg-[#07519c] hover:bg-[#07529cc3] h-12 text-lg text-white" variant="default">
            {locale === 'en' ? 'Continue Learning' : 'تابع التعلم'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProgressSidebar;
