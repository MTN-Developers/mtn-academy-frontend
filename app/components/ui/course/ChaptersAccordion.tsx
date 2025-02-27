// app/components/course/Playlist.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useParams, useRouter } from 'next/navigation';
import { getLangDir } from 'rtl-detect';
import { PlaylistSkeleton } from '../../common/PlaylistSkeleton';
import { CourseDetailsResponse } from '@/app/hooks/useCourseDetails';
import videoLibrary from '@/public/icons/video-library.svg';
import playIcon from '@/public/icons/play.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DisplayIcon from '@/components/icons/DisplayIcon';
import { Chapter, Video } from '@/app/types/video';
// import Link from 'next/link';

export const ChaptersAccordion = ({
  courseDetails,
  onVideoSelect,
  currentVideoId,
  currentChapterId,
  noBackground = false,
  innerBackground,
}: {
  courseDetails?: CourseDetailsResponse['data'];
  onVideoSelect?: (video: Video, chapter: Chapter) => void;
  currentChapterId?: string;
  currentVideoId?: string;
  noBackground?: boolean;
  innerBackground: 'bg-[#E7E7E7]' | 'bg-[#F7F7F7CF]';
}) => {
  const { locale } = useParams();
  const direction = getLangDir(locale as string);
  const isRTL = direction === 'rtl';
  const [openChapter, setOpenChapter] = useState<string | undefined>(undefined);
  const router = useRouter();

  console.log('courseDetails', courseDetails);

  // console.log('courseDetails', courseDetails?.is_unlocked);

  // Fixed handleRouting function
  const handleRouting = (video: Video, chapter: Chapter) => {
    if (courseDetails?.is_locked === true) {
      // If course is unlocked, allow navigation to watch page
      if (onVideoSelect) {
        onVideoSelect(video, chapter);
      }
      router.push(`/dashboard/course/${courseDetails.slug}/watch`);
    } else {
      // If course is locked, show alert
      alert('This course is locked. Please contact support for assistance.');
      // You could also use a more sophisticated alert/modal component here
    }
  };

  // Find and auto-open the chapter containing the current video
  useEffect(() => {
    if (currentVideoId && courseDetails) {
      const chapterWithCurrentVideo = courseDetails.chapters.find(chapter =>
        chapter.videos?.some(video => video.id === currentVideoId),
      );

      if (chapterWithCurrentVideo) {
        setOpenChapter(chapterWithCurrentVideo.id);
      }
    }
  }, [currentVideoId, courseDetails]);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!courseDetails) {
    return <PlaylistSkeleton />;
  }

  return (
    <div
      className={`w-full rounded-lg p-4 ${noBackground ? 'bg-transparent' : 'bg-white p-4 rounded-lg'} !shadow-none`}
    >
      <div className="flex items-center gap-4">
        <img
          src={isRTL ? courseDetails.logo_ar : courseDetails.logo_en}
          className="w-auto h-9 rounded-lg"
          alt="course logo"
        />
        <h3 className="text-2xl font-normal">{isRTL ? courseDetails.name_ar : courseDetails.name_en}</h3>
      </div>
      {courseDetails?.chapters?.map(chapter => (
        <div
          key={chapter.id}
          className={`space-y-4 ${
            !currentChapterId ? innerBackground : currentChapterId === chapter.id ? innerBackground : 'bg-transparent'
          } p-1 pr-4 rounded-[14px] my-4 shadow-none`}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full shadow-none"
            value={openChapter}
            onValueChange={setOpenChapter}
          >
            {
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
                      {isRTL ? chapter.title_ar : chapter.title_en}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  <div className="space-y-2">
                    {chapter.videos?.map(video => (
                      <div
                        key={video.id}
                        className={`flex items-center justify-between text-gray-700 hover:text-[#07519C] rounded-lg cursor-pointer py-2`}
                        onClick={() => handleRouting(video, chapter)} // Fixed: Now properly calls the function with parameters
                      >
                        <div className="flex items-center gap-4">
                          {/* <Image src={displayIcon} alt="video library icon" width={24} height={24} /> */}
                          <DisplayIcon color={video.id === currentVideoId ? '#07519C' : '#6B7280'} />
                          <span
                            className={`text-sm ${video.id === currentVideoId ? 'text-[#07519C] font-medium' : ''}`}
                          >
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
                      /* Add task icon here if needed */
                      /* {video.has_task && (
                    )} */
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            }
          </Accordion>
        </div>
      ))}
    </div>
  );
};
