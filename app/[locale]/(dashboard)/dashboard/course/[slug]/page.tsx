// app/[locale]/course/[slug]/page.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, LockKeyhole } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import { PathDetailsSkeleton } from '@/app/components/ui/home/PathDetailsSkeleton';
import { NotFoundState } from '@/app/components/common/NotFoundState';
import { ErrorState } from '@/app/components/common/ErrorState';
import { BreadcrumbFragment } from '@/app/components/common/BreadcrumbFragment';
import { useCourseDetails } from '@/app/hooks/useCourseDetails'; // We'll create this
import { Chapters } from '@/app/components/ui/course/Playlist';

const CoursePage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useCourseDetails(slug as string);
  const courseDetails = data?.data;
  console.log('courseDetails', courseDetails);
  const tCourse = useTranslations('course');
  const tTabs = useTranslations('tabs');
  const path = usePathname();
  const pathArr = path.split('/');
  const locale = pathArr[1];
  const direction = getLangDir(locale);
  const isRTL = direction === 'rtl';

  if (isLoading) {
    return <PathDetailsSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!courseDetails) {
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
                  <Chapters data={courseDetails.chapters} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sectio */}
          <div className="md:col-span-1 lg:relative w-[90%] mx-4 fixed bottom-4 left-0 font-poppins">
            <div className="bg-white p-4 md:p-6 rounded-lg my-4 shadow-sm md:sticky md:top-4 flex flex-col gap-3 justify-start items-center">
              <p className="text-2xl font-normal text-[#353535]">{tCourse('enrollNow')}</p>
              <div className="text-[64px] font-bold mb-2">$1300</div>
              <p className="text-center text-sm font-normal text-[#454545]">{tCourse('enjoyTheCourse')}</p>
              <Button className="w-full bg-[#07519C] mb-4 text-lg h-14">{tCourse('enrollNow')}</Button>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0 text-gray-600" />
                  <span className="break-words">
                    {courseDetails.course_duration
                      ? `${courseDetails.course_duration} ${tCourse('hours')}`
                      : tCourse('durationNotSpecified')}
                  </span>
                </div>
                {/* Add more course metadata here */}
              </div>
              ``
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
