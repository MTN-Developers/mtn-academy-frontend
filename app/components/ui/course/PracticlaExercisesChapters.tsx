// app/components/ui/course/PracticalExercisesChapters.tsx
import useGetPracticalEx from '@/app/hooks/useGetPracticalEx';
import { Course } from '@/app/types/video';
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import videoLibrary from '@/public/icons/video-library.svg';
import { PracticalChapter, PracticalVideo } from '@/app/types/practicalEx';
import { getLangDir } from 'rtl-detect';
import DisplayIcon from '@/components/icons/DisplayIcon';
import Link from 'next/link';
import { FreeStudyCourse } from '@/app/types/freeStudy';
// import { Dot } from 'lucide-react';

interface IProps {
  courseDetails: Course | FreeStudyCourse;
}

const PracticalExercisesChapters = ({ courseDetails }: IProps) => {
  const [openChapter, setOpenChapter] = useState<string | undefined>(undefined);
  const [currentVideoId, setCurrentVideoId] = useState<string | undefined>(undefined);
  const [currentChapterId, setCurrentChapterId] = useState<string | undefined>(undefined);

  const { data: chapters, isLoading, error } = useGetPracticalEx({ courseId: courseDetails.id });
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = getLangDir(locale) === 'rtl';

  // Format duration function
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle video selection
  const handleRouting = (video: PracticalVideo, chapter: PracticalChapter) => {
    setCurrentVideoId(video.id);
    setCurrentChapterId(chapter.id);

    // Navigate to the video
    router.push(`/dashboard/course/${courseDetails.slug}/watch-practical?videoId=${video.id}`);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading practical exercises...</div>;
  }

  if (error) {
    console.log('error in fetching practice', error);
    return <div className="p-8 text-center text-gray-500">No practical exercises available for this course, Error</div>;
  }

  // if (error || !chapters || chapters.length === 0) {
  //   return <div className="p-8 text-center text-gray-500">No practical exercises available for this course.</div>;
  // }

  return (
    <div className="w-full rounded-lg p-4 bg-white">
      <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center  lg:justify-between mx-2">
        <h2 className="text-xl font-semibold mb-1">{isRTL ? 'التدريبات العملية' : 'Practical Exercises'}</h2>

        {courseDetails.has_live && (
          <Link
            href={`/${locale}/dashboard/course/${courseDetails.slug}/live-session`}
            className="flex items-center gap-2"
          >
            {/* <span>
            <Dot className="text-xl" color="#075985" />
          </span> */}
            <p className="text-sky-800 text-base font-semibold animate-pulse">Live Session</p>
          </Link>
        )}
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full shadow-none"
        value={openChapter}
        onValueChange={setOpenChapter}
      >
        {chapters &&
          chapters?.length > 0 &&
          chapters.map(chapter => (
            <AccordionItem key={chapter.id} value={chapter.id} className="ml-6">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-4">
                  <Image src={videoLibrary} alt="video library icon" width={24} height={24} />
                  <h3
                    className={`font-medium text-xl ${
                      !currentChapterId
                        ? 'text-[#07519C]'
                        : currentChapterId === chapter.id
                        ? 'text-[#07519C]'
                        : 'text-[#545353]'
                    }`}
                  >
                    {locale === 'ar' ? chapter.title_ar : chapter.title_en}
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-4">
                <div className="space-y-2">
                  {chapter.videos?.map(video => (
                    <div
                      key={video.id}
                      className={`flex items-center justify-between text-gray-700 hover:text-[#07519C] rounded-lg cursor-pointer py-2`}
                      onClick={() => handleRouting(video, chapter)}
                    >
                      <div className="flex items-center gap-4">
                        <DisplayIcon color={video.id === currentVideoId ? '#07519C' : '#6B7280'} />

                        <span className={`text-sm ${video.id === currentVideoId ? 'text-[#07519C] font-medium' : ''}`}>
                          {isRTL ? video.title_ar : video.title_en}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        {formatDuration(video.duration)}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default PracticalExercisesChapters;
