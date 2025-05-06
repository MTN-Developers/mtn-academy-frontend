// app/components/course/Playlist.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useParams, useRouter } from 'next/navigation';
import { getLangDir } from 'rtl-detect';
import { PlaylistSkeleton } from '../../common/PlaylistSkeleton';
import { CourseDetailsResponse } from '@/app/hooks/useCourseDetails';
import videoLibrary from '@/public/icons/video-library.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Chapter, Video } from '@/app/types/video';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SemesterDetails } from '@/app/types/semester';
import VideoItem from '../course/VideoItem';

export const ChaptersFreeStudyAccordion = ({
  courseDetails,
  onVideoSelect,
  currentVideoId,
  currentChapterId,
  noBackground = false,
  innerBackground,
  showDialog,
}: {
  courseDetails?: CourseDetailsResponse['data'];
  onVideoSelect?: (video: Video, chapter: Chapter) => void;
  currentChapterId?: string;
  currentVideoId?: string;
  semester?: SemesterDetails;
  noBackground?: boolean;
  showDialog: boolean;
  innerBackground: 'bg-[#E7E7E7]' | 'bg-[#F7F7F7CF]';
}) => {
  const { locale } = useParams();
  const direction = getLangDir(locale as string);
  const isRTL = direction === 'rtl';
  const [openChapter, setOpenChapter] = useState<string | undefined>(undefined);
  const router = useRouter();

  // Add state for dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fixed handleRouting function
  const handleRouting = (video: Video, chapter: Chapter) => {
    if (showDialog) {
      // If course is locked, show dialog instead of alert
      setDialogOpen(true);
    } else if (courseDetails?.is_locked === true) {
      router.push(`/dashboard/free-study/${courseDetails?.slug}/payment`);
    } else {
      // If course is unlocked, allow navigation to watch page
      if (onVideoSelect) {
        onVideoSelect(video, chapter);
      }
      router.push(`/dashboard/course/${courseDetails?.slug}/watch`);
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

  // Sort chapters by their index property in ascending order
  const sortedChapters = [...courseDetails.chapters].sort((a, b) => a.index - b.index);

  return (
    <div
      className={`w-full rounded-lg p-4 ${noBackground ? 'bg-transparent' : 'bg-white p-4 rounded-lg'} !shadow-none`}
    >
      {/* Dialog component */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Course Locked</DialogTitle>
            <DialogDescription>This course is locked. Please contact support for assistance.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="bg-[#07519C]"
              onClick={() => {
                setDialogOpen(false);
                // You can add navigation to support page or other actions here
              }}
            >
              Contact Support
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-4">
        <img
          src={isRTL ? courseDetails.logo_ar : courseDetails.logo_en}
          className="w-auto h-9 rounded-lg"
          alt="course logo"
        />
        <h3 className="text-2xl font-normal">{isRTL ? courseDetails.name_ar : courseDetails.name_en}</h3>
      </div>
      {sortedChapters?.map(chapter => (
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
                      <VideoItem
                        key={video.id}
                        formatDuration={formatDuration}
                        video={video}
                        chapter={chapter}
                        handleRouting={handleRouting}
                        isRTL={isRTL}
                        currentVideoId={currentVideoId}
                        courseDetails={courseDetails}
                      />
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
