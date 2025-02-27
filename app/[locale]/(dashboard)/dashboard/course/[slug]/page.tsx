// app/[locale]/course/[slug]/page.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LockKeyhole } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import { PathDetailsSkeleton } from '@/app/components/ui/home/PathDetailsSkeleton';
import { NotFoundState } from '@/app/components/common/NotFoundState';
import { ErrorState } from '@/app/components/common/ErrorState';
import { BreadcrumbFragment } from '@/app/components/common/BreadcrumbFragment';
import { useCourseDetails } from '@/app/hooks/useCourseDetails'; // We'll create this
import { ChaptersAccordion } from '@/app/components/ui/course/ChaptersAccordion';
import { useSemesterDetailsById } from '@/app/hooks/useSemesterDetails';
import fileIcon from '@/public/icons/file.svg';
import personIcon from '@/public/icons/person-1.svg';
import clipIcon from '@/public/icons/clip.svg';
import smileIcon from '@/public/icons/smile.svg';
import infiniteIcon from '@/public/icons/infinite.svg';
import volumeIcon from '@/public/icons/volume.svg';

const CoursePage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useCourseDetails(slug as string);
  const courseDetails = data?.data;

  const {
    data: semesterDetails,
    isLoading: loadingSemester,
    error: errorSemester,
  } = useSemesterDetailsById(courseDetails?.semester_id || '');
  console.log('courseDetails is ', courseDetails);
  const tCourse = useTranslations('course');
  const tTabs = useTranslations('tabs');
  const path = usePathname();
  const pathArr = path.split('/');
  const locale = pathArr[1];
  const direction = getLangDir(locale);
  const isRTL = direction === 'rtl';
  console.log(semesterDetails);
  if (isLoading || loadingSemester) {
    return <PathDetailsSkeleton />;
  }

  if (errorSemester) {
    return <ErrorState error={errorSemester} />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!courseDetails || !semesterDetails) {
    return <NotFoundState />;
  }

  return (
    <div dir={direction} className="overflow-x-hidden bg-[#f2f2f2]">
      <BreadcrumbFragment
        pathName={isRTL ? courseDetails.name_ar : courseDetails.name_en}
        pathSlug={courseDetails.slug}
      />

      <div className="w-full p-4 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <Image
                src={isRTL ? courseDetails.logo_ar : courseDetails.logo_en}
                alt={isRTL ? courseDetails.name_ar : courseDetails.name_en}
                width={64}
                height={64}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-normal text-[#10458c] break-words">
                  {isRTL ? courseDetails.name_ar : courseDetails.name_en}
                </h1>
              </div>
            </div>

            {/* Video Preview */}
            {courseDetails.promotion_video_url ? (
              <div className="relative aspect-video bg-gray-900 rounded-lg mb-8 w-full">
                {/* Add your video player component here */}
                <iframe
                  style={{
                    borderRadius: '20px',
                  }}
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture pip"
                  key={courseDetails.id}
                  className="w-full h-full"
                  src={courseDetails.promotion_video_url}
                  // src={`https://therapy-gym-intimate-relationships.pages.dev/?stream#${src}`}
                  // src={`https://video-player-cxd.pages.dev/?stream#${src}`}
                  // src={`https://stream.mtninstitute.net/streaming/index.html?stream#${src}`}
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-gray-900 rounded-lg mb-8 w-full">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {tCourse('noVideoAvailable')}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="w-full overflow-x-auto">
              <Tabs defaultValue="information" className="mb-8">
                <TabsList className="w-full flex-nowrap bg-white">
                  <TabsTrigger value="information" className="tabs-trigger">
                    {tTabs('information')}
                  </TabsTrigger>
                  <TabsTrigger value="playlist" className="tabs-trigger">
                    {tTabs('playlist')}
                  </TabsTrigger>
                  <TabsTrigger value="discussions" disabled>
                    <LockKeyhole size={15} />
                    {tTabs('discussions')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="information" className="mt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700">
                      {isRTL ? courseDetails.description_ar : courseDetails.description_en}
                    </p>
                    {/* Add more course details here */}
                  </div>
                </TabsContent>
                <TabsContent value="playlist" className="mt-6">
                  <ChaptersAccordion courseDetails={courseDetails} innerBackground="bg-[#F7F7F7CF]" />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sectio */}
          <div className="md:col-span-1 lg:relative w-[90%] mx-4 fixed bottom-4 left-0 ">
            <div className="bg-white p-4 md:p-6 rounded-[14px] my-4 md:sticky md:top-4 flex flex-col gap-3 justify-start items-center shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]">
              <p className="text-2xl font-normal text-[#353535]">{tCourse('enrollNow')}</p>
              <div className="text-[64px] font-bold">${semesterDetails.price_after_discount}</div>
              {semesterDetails.price_after_discount < semesterDetails.price && (
                <p className="text-center text-sm font-normal text-red-400 mt-2">
                  <span className="line-through">${semesterDetails.price}</span>
                  <span className="text-red-400 inline mx-2 text-lg">
                    %{((semesterDetails.price - semesterDetails.price_after_discount) / 100).toFixed(0)} Discount
                  </span>
                </p>
              )}
              <p className="text-center text-sm font-normal text-[#454545]">{tCourse('enjoyTheCourse')}</p>
              <Button className="w-full bg-[#07519C] mb-4 text-lg h-14">{tCourse('enrollNow')}</Button>
            </div>
            <ul className="flex flex-col gap-y-3 mt-6">
              <li className="flex items-center gap-2">
                <Image width={13} height={13} src={personIcon} alt="person-icon" />
                <span className="text-sm text-[#161616]">
                  {courseDetails.enrolled_count} {tCourse('students')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Image width={13} height={13} src={clipIcon} alt="clip-icon" />
                <span className="text-sm text-[#161616]">
                  {courseDetails.videos_count} {tCourse('lessons')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Image width={13} height={13} src={fileIcon} alt="file-icon" />
                <span className="text-sm text-[#161616]">
                  {courseDetails.resources_count} {tCourse('additionalResources')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Image width={13} height={13} src={smileIcon} alt="smile-icon" />
                <span className="text-sm text-[#161616]">{tCourse('online')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Image width={13} height={13} src={volumeIcon} alt="volume-icon" />
                <span className="text-sm text-[#161616]">
                  {tCourse('audio')}: {tCourse('arabic')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Image width={13} height={13} src={infiniteIcon} alt="infinite-icon" />
                <span className="text-sm text-[#161616]">{tCourse('unlimitedAccess')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
