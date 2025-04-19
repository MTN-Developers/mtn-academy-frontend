// app/[locale]/course/[slug]/watch/page.tsx
'use client';
import Script from 'next/script';

declare global {
  interface Window {
    ATL_JQ_PAGE_PROPS: any;
    $: any;
  }
}
import { ErrorState } from '@/app/components/common/ErrorState';
import { ChaptersAccordion } from '@/app/components/ui/course/ChaptersAccordion';
import { VideoPlayer } from '@/app/components/ui/course/VideoPlayer';
import { PathDetailsSkeleton } from '@/app/components/ui/home/PathDetailsSkeleton';
import { useCourseDetails } from '@/app/hooks/useCourseDetails';
import { useSemesterDetails } from '@/app/hooks/useSemesterDetails';
import { RootState } from '@/app/lib/redux/store';
import { Chapter, Video } from '@/app/types/video';
import { Comments } from '@/app/components/ui/comments/Comments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLangDir } from 'rtl-detect';
import useGetAssigmentWithAnswers from '@/app/hooks/useGetAssigmentWithAnswers';
import { AssignmentView } from '@/app/components/ui/course/AssignmentView';

import FeedbackCollector from '@/app/components/FeedbackCollector';

const findVideoInChapters = (chapters: Chapter[], videoId: string): { video: Video; chapter: Chapter } | null => {
  for (const chapter of chapters) {
    const video = chapter.videos?.find(v => v.id === videoId);
    if (video) {
      return { video, chapter };
    }
  }
  return null;
};

export default function WatchPage() {
  const { slug, locale } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoId = searchParams.get('videoId');
  const { item: reduxData } = useSelector((state: RootState) => state.courseBySlug);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const isRTL = getLangDir(locale as string) === 'rtl';
  const tTabs = useTranslations('tabs');

  const [viewMode, setViewMode] = useState<'video' | 'assignment'>('video');
  const { data: assignmentQuestions } = useGetAssigmentWithAnswers({
    videoId: currentVideo?.id || '',
  });
  const { user } = useSelector((state: RootState) => state.auth);

  const hasAssignment = assignmentQuestions && assignmentQuestions.length > 0;

  // Determine if we should show assignment view
  useEffect(() => {
    // Check if the URL has an assignment parameter
    const showAssignment = searchParams.get('view') === 'assignment';
    if (showAssignment && hasAssignment) {
      setViewMode('assignment');
    } else {
      setViewMode('video');
    }
  }, [searchParams, hasAssignment]);

  // Function to toggle between video and assignment views
  const toggleViewMode = (mode: 'video' | 'assignment') => {
    // Create a new URLSearchParams object
    const newParams = new URLSearchParams(searchParams.toString());

    if (mode === 'assignment') {
      newParams.set('view', 'assignment');
    } else {
      newParams.delete('view');
    }

    // Update the URL with the new query parameter
    router.replace(`${window.location.pathname}?${newParams.toString()}`, { scroll: false });
    setViewMode(mode);
  };

  // Only fetch if redux data is not available
  const { data, isLoading, error } = useCourseDetails(slug as string, {
    enabled: !reduxData, // Only fetch if redux data is not present
  });

  // Use redux data if available, otherwise use query data
  const courseData = reduxData || data?.data;

  // Fetch semester details
  const {
    data: semesterData,
    isLoading: loadingSemester,
    error: errorSemester,
  } = useSemesterDetails(courseData?.semester_id || '');

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
    if (!courseData) return;
    if (courseData.is_locked === true) {
      // alert('This course is locked. Please contact support for assistance.');
      router.push(`/dashboard/course/${courseData.slug}`);
    }

    if (courseData.is_locked === true) {
      // alert('This course is locked. Please contact support for assistance.');
      router.push(`/dashboard/course/${courseData.slug}`);
    }

    // Try to get video from URL parameter
    if (videoId) {
      const found = findVideoInChapters(courseData.chapters, videoId);
      if (found) {
        setCurrentVideo(found.video);
        setCurrentChapter(found.chapter);
        // Save to localStorage
        localStorage.setItem(
          `course-${slug}-progress`,
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
    const savedProgress = localStorage.getItem(`course-${slug}-progress`);
    if (savedProgress) {
      const { videoId: savedVideoId } = JSON.parse(savedProgress);
      const found = findVideoInChapters(courseData.chapters, savedVideoId);
      if (found) {
        setCurrentVideo(found.video);
        setCurrentChapter(found.chapter);
        return;
      }
    }

    // Fallback to first video
    const firstChapter = courseData.chapters[0];
    const firstVideo = firstChapter?.videos?.[0];
    if (firstChapter && firstVideo) {
      setCurrentVideo(firstVideo);
      setCurrentChapter(firstChapter);
      localStorage.setItem(
        `course-${slug}-progress`,
        JSON.stringify({
          videoId: firstVideo.id,
          chapterId: firstChapter.id,
          timestamp: new Date().toISOString(),
        }),
      );
    }
  }, [courseData, videoId, slug, router]);

  // console.log('watch is ', courseData);

  // Handle video selection from chapters list
  const handleVideoSelect = (video: Video, chapter: Chapter) => {
    setCurrentVideo(video);
    setCurrentChapter(chapter);
    localStorage.setItem(
      `course-${slug}-progress`,
      JSON.stringify({
        videoId: video.id,
        chapterId: chapter.id,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  if (isLoading || loadingSemester) {
    return <PathDetailsSkeleton />;
  }
  if (error || errorSemester) {
    // Ensure we always pass an Error object
    const errorToDisplay = error || errorSemester || new Error('Unknown error');
    return <ErrorState error={errorToDisplay} />;
  }

  // console.log('curent video is ', currentVideo);

  // Define content elements to be ordered based on direction
  const VideoSection = (
    <div className="lg:col-span-2">
      {viewMode === 'video' ? (
        <VideoPlayer chapterVideoId={currentChapter?.id} video={currentVideo} url={currentVideo?.video_url} />
      ) : (
        currentVideo && <AssignmentView videoId={currentVideo.id} />
      )}

      {/* Tabs */}
      <div className="w-full overflow-x-auto mt-5">
        <Tabs
          defaultValue={viewMode === 'assignment' ? 'assignment' : 'session'}
          className="mb-8 shadow-none rounded-none"
        >
          <TabsList className="w-full relative flex-nowrap bg-[#F2F2F2] border-b border-[#DFDFDF] p-0 m-0 shadow-none rounded-none">
            <TabsTrigger
              value="session"
              onClick={() => viewMode === 'assignment' && toggleViewMode('video')}
              className="tabs-trigger text-[#656565] font-normal ml-4 py-5 px-4 rounded-none data-[state=active]:shadow-none data-[state=active]:ring-transparent data-[state=active]:bg-[#F2F2F2] data-[state=active]:no-underline data-[state=active]:border-b-2 data-[state=active]:border-[#017AFD] data-[state=active]:font-medium data-[state=active]:text-[#017AFD]"
            >
              {tTabs('session')}
            </TabsTrigger>

            <TabsTrigger
              value="comments"
              onClick={() => viewMode === 'assignment' && toggleViewMode('video')}
              className="tabs-trigger text-[#656565] font-normal py-5 px-4 rounded-none data-[state=active]:shadow-none data-[state=active]:ring-transparent data-[state=active]:bg-[#F2F2F2] data-[state=active]:no-underline data-[state=active]:border-b-2 data-[state=active]:border-[#017AFD] data-[state=active]:font-medium data-[state=active]:text-[#017AFD]"
            >
              {tTabs('comments')}
            </TabsTrigger>

            {/* Only show assignment tab if assignment exists */}
            {/* {hasAssignment && (
              <TabsTrigger
                value="assignment"
                onClick={() => viewMode === 'video' && toggleViewMode('assignment')}
                className="tabs-trigger text-[#656565] font-normal py-5 px-4 rounded-none data-[state=active]:shadow-none data-[state=active]:ring-transparent data-[state=active]:bg-[#F2F2F2] data-[state=active]:no-underline data-[state=active]:border-b-2 data-[state=active]:border-[#017AFD] data-[state=active]:font-medium data-[state=active]:text-[#017AFD]"
              >
                {isRTL ? 'التطبيق' : 'Assignment'}
              </TabsTrigger>
            )} */}

            {/* here should go the complaints icons */}
            <div className="absolute right-0 top-4 flex items-center gap-4 mr-4">
              <FeedbackCollector pathname={window.location.pathname} />
            </div>
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

          <TabsContent value="assignment">
            {/* This is intentionally empty as we're showing the assignment view instead of the video player */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const ChaptersSection = (
    <div className="lg:col-span-1">
      <div className="rounded-lg">
        <ChaptersAccordion
          courseDetails={courseData}
          currentVideoId={currentVideo?.id}
          currentChapterId={currentChapter?.id}
          onVideoSelect={handleVideoSelect}
          noBackground={true}
          innerBackground="bg-[#E7E7E7]"
          semester={semesterData} // Add the semester prop
          showDialog={false} // Since we're in the watch page, we don't need to show the dialog
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Add jQuery and Atlassian Collector Scripts */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" crossOrigin="anonymous" />
      <Script
        src="https://managethenow.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/xghl7j/b/3/c95134bc67d3a521bb3f4331beb9b804/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=ar-eg&collectorId=98474ad5"
        strategy="afterInteractive"
        onLoad={() => {
          window.ATL_JQ_PAGE_PROPS = $.extend(window.ATL_JQ_PAGE_PROPS, {
            triggerFunction: function (showCollectorDialog) {
              jQuery('#myCustomTrigger').click(function (e) {
                e.preventDefault();
                window.ATL_JQ_PAGE_PROPS.fieldValues.email = user?.email;
                window.ATL_JQ_PAGE_PROPS.fieldValues.fullname = user?.name;
                // window.ATL_JQ_PAGE_PROPS.fieldValues.description = 'description';
                // window.ATL_JQ_PAGE_PROPS.fieldValues.summary = 'summary';
                showCollectorDialog();
              });
            },
            fieldValues: function () {
              return {
                email: user?.email,
                recordWebInfo: '1',
                recordWebInfoConsent: ['1'],
              };
            },
          });
        }}
      />

      {/* Hidden email input - replace value with dynamic user email */}
      <input type="hidden" id="email" value="user@example.com" />

      <div className="min-h-screen lg:px-20 bg-[#F2F2F2]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {/* Order sections based on RTL/LTR */}
          {isRTL ? (
            <>
              {VideoSection}
              {ChaptersSection}
            </>
          ) : (
            <>
              {VideoSection}
              {ChaptersSection}
            </>
          )}
        </div>
      </div>
    </>
  );
}
