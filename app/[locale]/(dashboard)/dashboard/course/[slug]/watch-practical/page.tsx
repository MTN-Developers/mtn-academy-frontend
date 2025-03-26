// app/[locale]/course/[slug]/watch-practical/page.tsx
'use client';

import { ErrorState } from '@/app/components/common/ErrorState';
import { VideoPlayer } from '@/app/components/ui/course/VideoPlayer';
import { PathDetailsSkeleton } from '@/app/components/ui/home/PathDetailsSkeleton';
import { useCourseDetails } from '@/app/hooks/useCourseDetails';
import useGetPracticalEx from '@/app/hooks/useGetPracticalEx';
import { RootState } from '@/app/lib/redux/store';
import { PracticalChapter, PracticalVideo } from '@/app/types/practicalEx';
import { Comments } from '@/app/components/ui/comments/Comments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLangDir } from 'rtl-detect';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import videoLibrary from '@/public/icons/video-library.svg';
import DisplayIcon from '@/components/icons/DisplayIcon';
import playIcon from '@/public/icons/play.svg';

const findVideoInChapters = (
  chapters: PracticalChapter[],
  videoId: string,
): { video: PracticalVideo; chapter: PracticalChapter } | null => {
  for (const chapter of chapters) {
    const video = chapter.videos?.find(v => v.id === videoId);
    if (video) {
      return { video, chapter };
    }
  }
  return null;
};

export default function WatchPracticalPage() {
  const { slug, locale } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoId = searchParams.get('videoId');
  const { item: reduxData } = useSelector((state: RootState) => state.courseBySlug);
  const [currentVideo, setCurrentVideo] = useState<PracticalVideo | null>(null);
  const [currentChapter, setCurrentChapter] = useState<PracticalChapter | null>(null);
  const [openChapter, setOpenChapter] = useState<string | undefined>(undefined);
  const isRTL = getLangDir(locale as string) === 'rtl';
  const tTabs = useTranslations('tabs');

  // Only fetch if redux data is not available
  const { data, isLoading, error } = useCourseDetails(slug as string, {
    enabled: !reduxData, // Only fetch if redux data is not present
  });

  // Use redux data if available, otherwise use query data
  const courseData = reduxData || data?.data;

  // Fetch practical exercises
  const {
    data: practicalChapters,
    isLoading: loadingPractical,
    error: errorPractical,
  } = useGetPracticalEx({ courseId: courseData?.id || '' });

  // Format duration function
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update URL when current video changes
  useEffect(() => {
    if (currentVideo && currentVideo.id !== videoId) {
      // Create a new URLSearchParams object
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('videoId', currentVideo.id);

      // Update the URL with the new query parameter
      router.replace(`${window.location.pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [currentVideo, router, searchParams, videoId]);

  useEffect(() => {
    if (!courseData || !practicalChapters) return;

    if (courseData.is_locked === true) {
      router.push(`/dashboard/course/${courseData.slug}`);
      return;
    }

    // Try to get video from URL parameter
    if (videoId && practicalChapters.length > 0) {
      const found = findVideoInChapters(practicalChapters, videoId);
      if (found) {
        setCurrentVideo(found.video);
        setCurrentChapter(found.chapter);
        setOpenChapter(found.chapter.id);
        // Save to localStorage
        localStorage.setItem(
          `course-${slug}-practical-progress`,
          JSON.stringify({
            videoId: found.video.id,
            chapterId: found.chapter.id,
            timestamp: new Date().toISOString(),
          }),
        );
        return;
      }
    }

    // Try to get from localStorage
    const savedProgress = localStorage.getItem(`course-${slug}-practical-progress`);
    if (savedProgress && practicalChapters.length > 0) {
      const { videoId: savedVideoId } = JSON.parse(savedProgress);
      const found = findVideoInChapters(practicalChapters, savedVideoId);
      if (found) {
        setCurrentVideo(found.video);
        setCurrentChapter(found.chapter);
        setOpenChapter(found.chapter.id);
        return;
      }
    }

    // Fallback to first video
    if (practicalChapters.length > 0) {
      const firstChapter = practicalChapters[0];
      const firstVideo = firstChapter?.videos?.[0];
      if (firstChapter && firstVideo) {
        setCurrentVideo(firstVideo);
        setCurrentChapter(firstChapter);
        setOpenChapter(firstChapter.id);
        localStorage.setItem(
          `course-${slug}-practical-progress`,
          JSON.stringify({
            videoId: firstVideo.id,
            chapterId: firstChapter.id,
            timestamp: new Date().toISOString(),
          }),
        );
      }
    }
  }, [courseData, practicalChapters, videoId, slug, router]);

  // Handle video selection from chapters list
  const handleVideoSelect = (video: PracticalVideo, chapter: PracticalChapter) => {
    setCurrentVideo(video);
    setCurrentChapter(chapter);
    localStorage.setItem(
      `course-${slug}-practical-progress`,
      JSON.stringify({
        videoId: video.id,
        chapterId: chapter.id,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  if (isLoading || loadingPractical) {
    return <PathDetailsSkeleton />;
  }

  if (error || errorPractical) {
    // Ensure we always pass an Error object
    const errorToDisplay = error || errorPractical || new Error('Unknown error');
    return <ErrorState error={errorToDisplay} />;
  }

  if (!practicalChapters || practicalChapters.length === 0) {
    return (
      <div className="min-h-screen lg:px-20 bg-[#F2F2F2] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? 'لا توجد تدريبات عملية متاحة' : 'No practical exercises available'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isRTL
              ? 'لا توجد تدريبات عملية متاحة لهذه الدورة في الوقت الحالي.'
              : 'There are no practical exercises available for this course at the moment.'}
          </p>
          <button
            onClick={() => courseData && router.push(`/dashboard/course/${courseData.slug}`)}
            className="px-4 py-2 bg-[#07519C] text-white rounded-md hover:bg-[#064079] transition-colors"
          >
            {isRTL ? 'العودة إلى الدورة' : 'Back to Course'}
          </button>
        </div>
      </div>
    );
  }

  // Define content elements to be ordered based on direction
  const VideoSection = (
    <div className="lg:col-span-2">
      <VideoPlayer chapterVideoId={currentChapter?.id} video={currentVideo as any} url={currentVideo?.video_url} />

      {/* Tabs */}
      <div className="w-full overflow-x-auto mt-5">
        <Tabs defaultValue="session" className="mb-8 shadow-none rounded-none">
          <TabsList className="w-full flex-nowrap bg-[#F2F2F2] border-b border-[#DFDFDF] p-0 m-0 shadow-none rounded-none">
            <TabsTrigger
              value="session"
              className="tabs-trigger text-[#656565] font-normal ml-4 py-5 px-4 rounded-none data-[state=active]:shadow-none data-[state=active]:ring-transparent data-[state=active]:bg-[#F2F2F2] data-[state=active]:no-underline data-[state=active]:border-b-2 data-[state=active]:border-[#017AFD] data-[state=active]:font-medium data-[state=active]:text-[#017AFD]"
            >
              {tTabs('session')}
            </TabsTrigger>

            <TabsTrigger
              value="comments"
              className="tabs-trigger text-[#656565] font-normal py-5 px-4 rounded-none data-[state=active]:shadow-none data-[state=active]:ring-transparent data-[state=active]:bg-[#F2F2F2] data-[state=active]:no-underline data-[state=active]:border-b-2 data-[state=active]:border-[#017AFD] data-[state=active]:font-medium data-[state=active]:text-[#017AFD]"
            >
              {tTabs('comments')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="session" className="mt-6 ml-4">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              {isRTL ? currentVideo?.title_ar : currentVideo?.title_en}
            </h2>

            <p className="text-sm md:text-base text-[#161616] mb-4">
              {isRTL ? currentVideo?.description_ar : currentVideo?.description_en}
            </p>
          </TabsContent>

          <TabsContent value="comments">
            {videoId && currentVideo ? <Comments videoId={currentVideo.id} /> : null}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const PracticalChaptersSection = (
    <div className="lg:col-span-1">
      <div className="rounded-lg bg-white p-4">
        <div className="flex items-center gap-4 mb-4">
          {courseData && (
            <Image
              src={isRTL ? courseData.logo_ar : courseData.logo_en}
              className="w-auto h-9 rounded-lg"
              alt="course logo"
              width={36}
              height={36}
            />
          )}
          {courseData && <h3 className="text-2xl font-normal">{isRTL ? courseData.name_ar : courseData.name_en}</h3>}
        </div>

        <h4 className="text-lg font-medium mb-4">{isRTL ? 'التدريبات العملية' : 'Practical Exercises'}</h4>

        <Accordion
          type="single"
          collapsible
          className="w-full shadow-none"
          value={openChapter}
          onValueChange={setOpenChapter}
        >
          {practicalChapters.map(chapter => (
            <div
              key={chapter.id}
              className={`space-y-4 ${
                !currentChapter?.id
                  ? 'bg-[#E7E7E7]'
                  : currentChapter?.id === chapter.id
                  ? 'bg-[#E7E7E7]'
                  : 'bg-transparent'
              } p-1 pr-4 rounded-[14px] my-4 shadow-none`}
            >
              <AccordionItem value={chapter.id} className="ml-6 border-none">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4">
                    <Image src={videoLibrary} alt="video library icon" width={24} height={24} />
                    <h3
                      className={`font-medium text-xl ${
                        !currentChapter?.id
                          ? 'text-[#07519C]'
                          : currentChapter?.id === chapter.id
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
                        onClick={() => handleVideoSelect(video, chapter)}
                      >
                        <div className="flex items-center gap-4">
                          <DisplayIcon color={video.id === currentVideo?.id ? '#07519C' : '#6B7280'} />
                          <span
                            className={`text-sm ${video.id === currentVideo?.id ? 'text-[#07519C] font-medium' : ''}`}
                          >
                            {isRTL ? video.title_ar : video.title_en}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          {video.id === currentVideo?.id ? (
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
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:px-20 bg-[#F2F2F2]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {/* Order sections based on RTL/LTR */}
        {isRTL ? (
          <>
            {VideoSection}
            {PracticalChaptersSection}
          </>
        ) : (
          <>
            {VideoSection}
            {PracticalChaptersSection}
          </>
        )}
      </div>
    </div>
  );
}
