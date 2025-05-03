'use client';

import { BreadcrumbFragment } from '@/app/components/common/BreadcrumbFragment';
import { ErrorState } from '@/app/components/common/ErrorState';
import { ShareButton } from '@/app/components/common/ShareButton';
import FeedbackCollector from '@/app/components/FeedbackCollector';
import { PathDetailsSkeleton } from '@/app/components/ui/home/PathDetailsSkeleton';
import useGetAllFreeStudies from '@/app/hooks/useGetAllFreeStudies';
import { FreeStudyCourse } from '@/app/types/freeStudy';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import basicAr from '@/public/images/basicAr.png';
import basicEn from '@/public/images/basicEn.png';
import ContinueLearningMob from '@/app/components/common/ContinueLearningMob';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarComp from '@/app/components/ui/calendar/CalendarComp';
import SidebarSemester from '@/app/components/common/SidebarSemester';
import ProgressSidebar from '@/app/components/ui/course/ProgressSidebar';
import { useTranslations } from 'next-intl';

type Props = {};

const Page = (props: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const { data, isError, error, isLoading } = useGetAllFreeStudies({ slug: params.slug as string });
  const tCourse = useTranslations('course');
  const tTabs = useTranslations('tabs');

  const study: FreeStudyCourse = data?.data;
  const isRTL = locale === 'ar';

  if (isLoading) {
    return <PathDetailsSkeleton />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      {study && (
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="overflow-x-hidden bg-[#f2f2f2]">
          <BreadcrumbFragment semesterName={isRTL ? study.name_ar : study.name_en} semesterId={study.id} />

          <div className="w-full p-4 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Content */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-3 flex-wrap">
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={isRTL ? study?.logo_ar ?? '/fallback-image.png' : study?.logo_en ?? '/fallback-image.png'}
                        alt={isRTL ? study.name_ar : study.name_en}
                        width={64}
                        height={64}
                        className="rounded-lg"
                      />
                      <div>
                        <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                          {isRTL ? study.name_ar : study.name_en}
                        </h1>
                        <p className="text-gray-600 text-sm">
                          {tCourse('by')} <span className="font-semibold">{'By Ahmed Eldmallawy'}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* here should go the complaints and suggestions icon */}
                      {/* Updated complaints icon with trigger */}
                      <FeedbackCollector pathname={pathname} />

                      <ShareButton
                        title="Share this semester"
                        customShareText={`Hi, I am taking this amazing semester: ${
                          isRTL ? study.name_ar : study.name_en
                        }`}
                      />
                    </div>
                  </div>

                  {/* Video Preview */}
                  <div className="relative aspect-video overflow-hidden bg-gray-900 rounded-lg mb-8 w-full">
                    <div className="absolute inset-0 flex  overflow-hidden items-center justify-center text-white">
                      {/* {tCourse('noVideoAvailable')}
                       */}
                      <Image src={locale === 'ar' ? basicAr : basicEn} className="w-full" alt="temp img" />
                    </div>
                  </div>
                  {/* {semesterDetails.promotion_video_url ? (
                    <div className="relative aspect-video rounded-lg w-full">
                      <iframe
                        style={{
                          borderRadius: '20px',
                        }}
                        allowFullScreen
                        allow="autoplay; fullscreen; picture-in-picture pip"
                        key={semesterDetails.id}
                        className="w-full h-full"
                        src={semesterDetails.promotion_video_url}
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-gray-900 rounded-lg mb-8 w-full">
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        {tCourse('noVideoAvailable')}
                      </div>
                    </div>
                  )} */}

                  {/* <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                      {isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {tCourse('semester')} {semesterDetails.order}
                    </p>
                  </div> */}
                </div>

                <ContinueLearningMob isRTL={isRTL} locale={locale} semesterDetails={study} />

                {/* Tabs */}
                <div className="w-full overflow-x-auto">
                  <Tabs dir={`${locale === 'ar' ? 'rtl' : 'ltr'}`} defaultValue="information" className="mb-10">
                    <TabsList className="w-full flex-nowrap bg-white">
                      <TabsTrigger value="information" className="tabs-trigger">
                        {tTabs('information')}
                      </TabsTrigger>
                      <TabsTrigger value="courses" className="tabs-trigger">
                        {tTabs('courses')}
                      </TabsTrigger>
                      <TabsTrigger value="calendar" className="tabs-trigger">
                        {tTabs('calendar')}
                      </TabsTrigger>
                      {/* <TabsTrigger value="discussions" disabled>
                        <LockKeyhole size={15} />
                        {tTabs('discussions')}
                      </TabsTrigger> */}
                    </TabsList>

                    <TabsContent value="information" className="mt-6">
                      <div className="prose max-w-none">
                        <p className="text-gray-700">{isRTL ? study.description_ar : study.description_en}</p>
                      </div>
                    </TabsContent>

                    {/* <TabsContent value="courses">
                      <CoursesGrid courses={semesterDetails.courses} isRTL={isRTL} />
                    </TabsContent> */}

                    <TabsContent value="calendar">
                      <CalendarComp semesterId={study.id} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {study.is_locked === false ? (
                <>
                  <SidebarSemester discount={study.price_after_discount} semesterDetails={study} tCourse={tCourse} />
                </>
              ) : (
                <>
                  <ProgressSidebar semesterId={study.id} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
