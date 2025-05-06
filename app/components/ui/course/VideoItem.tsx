// app/components/ui/course/VideoItem.tsx
import { Chapter, Video } from '@/app/types/video';
import React from 'react';
import DisplayIcon from '@/components/icons/DisplayIcon';
import playIcon from '@/public/icons/play.svg';
import Image from 'next/image';
import { CheckCircle2, FileText } from 'lucide-react';
import useGetAssigmentWithAnswers from '@/app/hooks/useGetAssigmentWithAnswers';
import { CourseDetailsResponse } from '@/app/hooks/useCourseDetails';
import { useParams, useRouter } from 'next/navigation';
import { FreeStudyCourse } from '@/app/types/freeStudy';

interface IProps {
  video: Video;
  chapter: Chapter;
  handleRouting: (video: Video, chapter: Chapter) => void;
  formatDuration: (duration: number) => string;
  isRTL: boolean;
  currentVideoId: string | undefined;
  courseDetails: CourseDetailsResponse['data'] | FreeStudyCourse;
}

const VideoItem = ({ video, courseDetails, chapter, currentVideoId, isRTL, formatDuration, handleRouting }: IProps) => {
  const { data: questions } = useGetAssigmentWithAnswers({ videoId: video.id });
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const isReachable = !courseDetails?.is_locked;
  const hasAssignment = questions && questions.length > 0;

  // Check if all questions have been answered
  const allQuestionsAnswered = hasAssignment && questions.every(question => question.answer !== null);

  // Check if some questions have been answered
  const someQuestionsAnswered =
    hasAssignment && questions.some(question => question.answer !== null) && !allQuestionsAnswered;

  const handleRoutingToAssignment = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click handler

    if (!isReachable) {
      console.log('Assignment is locked');
      return;
    }

    // First navigate to the video if it's not the current one
    if (video.id !== currentVideoId) {
      handleRouting(video, chapter);

      // Wait a bit for the navigation to complete
      setTimeout(() => {
        router.push(`/${locale}/dashboard/course/${courseDetails.slug}/watch?videoId=${video.id}&view=assignment`);
      }, 100);
    } else {
      // If already on the correct video, just add the assignment view parameter
      router.push(`/${locale}/dashboard/course/${courseDetails.slug}/watch?videoId=${video.id}&view=assignment`);
    }
  };

  return (
    <>
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
          {video.id === currentVideoId ? (
            <div className="flex-shrink-0 w-[35px] h-[35px]">
              <Image
                src={playIcon}
                alt="play icon"
                width={35}
                height={35}
                style={{ width: '35px', height: '35px', flexShrink: 0 }}
              />
            </div>
          ) : (
            formatDuration(video.duration)
          )}
        </span>
      </div>

      {hasAssignment && (
        <div
          onClick={handleRoutingToAssignment}
          className={`mx-4 p-2 cursor-pointer flex ${
            isReachable ? 'text-gray-700 hover:text-[#07519C]' : 'text-gray-400'
          } items-center border-t-2 text-sm border-t-gray-300`}
        >
          <span className="mx-2">
            {allQuestionsAnswered ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : someQuestionsAnswered ? (
              <div className="relative">
                <FileText className={isReachable ? 'text-gray-500' : 'text-gray-400'} size={20} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            ) : (
              <FileText className={isReachable ? 'text-gray-500' : 'text-gray-400'} size={20} />
            )}
          </span>
          <div className="flex flex-col">
            <span>{isRTL ? 'التطبيق' : 'Chapter Assignment'}</span>
            {allQuestionsAnswered && <span className="text-xs text-green-500">{isRTL ? 'مكتمل' : 'Completed'}</span>}
            {someQuestionsAnswered && (
              <span className="text-xs text-yellow-500">{isRTL ? 'قيد التقدم' : 'In progress'}</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoItem;
