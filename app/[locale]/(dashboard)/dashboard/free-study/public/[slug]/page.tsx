// app/[locale]/course/[slug]/page.tsx
'use client';
// import Script from 'next/script';

import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LockKeyhole } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import { PathDetailsSkeleton } from '@/app/components/ui/home/PathDetailsSkeleton';
import { NotFoundState } from '@/app/components/common/NotFoundState';
import { ErrorState } from '@/app/components/common/ErrorState';
// import { BreadcrumbFragment } from '@/app/components/common/BreadcrumbFragment';
// import { useCourseDetails } from '@/app/hooks/useCourseDetails'; // We'll create this
// import { ChaptersAccordion } from '@/app/components/ui/course/ChaptersAccordion';
// import { useEffect, useState } from 'react';
import { ShareButton } from '@/app/components/common/ShareButton';
// import basicAr from '@/public/images/basicAr.png';
// import basicEn from '@/public/images/basicEn.png';
// import ProgressSidebar from '@/app/components/ui/course/ProgressSidebar';
import ContinueLearningMob from '@/app/components/common/ContinueLearningMob';
// import MaterialsComp from '@/app/components/ui/materials/MaterialsComp';
// import PracticlaExercisesChapters from '@/app/components/ui/course/PracticlaExercisesChapters';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/lib/redux/store';
import FeedbackCollector from '@/app/components/FeedbackCollector';
import SidebarFreeStudy from '@/app/components/ui/freeStudies/SidebarFreeStudy';
// import { ChaptersFreeStudyAccordion } from '@/app/components/ui/freeStudies/ChaptersFreeStudyAccordion';
import UseGetFreeStudy from '@/app/hooks/UseGetFreeStudy';
// import Coachmark from '@/app/components/Coachmark';

const FreeStudyPage = () => {
  const { slug } = useParams();
  // const [showDialog, setShowDialog] = useState(false);
  // const [_goToPayment, setGoToPayment] = useState(false);
  // const { data, isLoading, error, isError } = useCourseDetails(slug as string);
  const { data, isLoading, error, isError } = UseGetFreeStudy({ slug: slug as string, isPublic: true });

  const courseDetails = data;
  const price = courseDetails?.price;

  console.log(courseDetails?.price);

  // const { user } = useSelector((state: RootState) => state.auth);

  // const {
  //   data: semesterDetails,
  //   isLoading: loadingSemester,
  //   error: errorSemester,
  // } = useSemesterDetails(courseDetails?.semester_id || '');

  // console.log('data course', courseDetails);

  // console.log('semester course', semesterDetails);

  // console.log('courseDetails is ', courseDetails);
  const tCourse = useTranslations('course');
  const tTabs = useTranslations('tabs');
  const path = usePathname();
  const pathArr = path.split('/');
  const locale = pathArr[1];
  const direction = getLangDir(locale);
  const isRTL = direction === 'rtl';

  // Move the dialog logic to useEffect so it only runs when dependencies change
  // useEffect(() => {
  //   if (courseDetails?.is_locked === true) {
  //     setGoToPayment(true);
  //     setShowDialog(false);
  //     // console.log('gotopayment', goToPayment);
  //   } else {
  //     setShowDialog(false);
  //   }
  // }, [courseDetails?.is_locked]);

  if (isLoading) {
    return <PathDetailsSkeleton />;
  }

  if (isError) {
    console.log(error);
    return <ErrorState error={error} />;
  }

  if (!courseDetails) {
    return <NotFoundState />;
  }

  const discount = ((courseDetails?.price ?? 0) - (courseDetails?.price_after_discount ?? 0) / 100).toFixed(0);

  return (
    <>
      <div dir={direction} className="overflow-x-hidden bg-[#f2f2f2]">
        {/* <BreadcrumbFragment
          semesterName={isRTL ? courseDetails.name_ar : courseDetails.name_en}
          semesterId={courseDetails.id}
          courseName={isRTL ? courseDetails.name_ar : courseDetails.name_en}
        /> */}

        {/* <Coachmark targetId="feedback-trigger" /> */}

        <div className="w-full p-4 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="md:col-span-2">
              <div className="flex my-2 items-center w-full justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      isRTL
                        ? courseDetails.logo_ar ?? '/default-logo.png'
                        : courseDetails.logo_en ?? '/default-logo.png'
                    }
                    alt={isRTL ? courseDetails.name_ar : courseDetails.name_en}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                      {isRTL ? courseDetails.name_ar : courseDetails.name_en}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {tCourse('by')} <span className="font-semibold">{'By Ahmed Eldmallawy'}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* here should go the complaints and suggestions icon */}
                  {/* Updated complaints icon with trigger */}
                  <FeedbackCollector pathname={path} />

                  <ShareButton
                    title="Share this semester"
                    customShareText={`Hi, I am taking this amazing semester: ${
                      isRTL ? courseDetails.name_ar : courseDetails.name_en
                    }`}
                  />
                </div>
              </div>

              {/* Video Preview */}
              <div className="relative aspect-video overflow-hidden bg-gray-900 rounded-lg mb-8 w-full">
                <div className="absolute inset-0 flex  overflow-hidden items-center justify-center text-white">
                  {/* {tCourse('noVideoAvailable')}
                   */}
                  <Image
                    src={
                      locale === 'ar'
                        ? courseDetails.logo_ar ?? '/default-logo.png'
                        : courseDetails.logo_en ?? '/default-logo.png'
                    }
                    className="w-full"
                    alt="temp img"
                    width={400}
                    height={300}
                  />
                </div>
              </div>
              {/* {courseDetails.promotion_video_url && courseDetails.promotion_video_url.length > 20 ? (
              <div className="relative aspect-video bg-gray-900 rounded-lg mb-3 w-full">
                <iframe
                  style={{
                    borderRadius: '20px',
                  }}
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture pip"
                  key={courseDetails.id}
                  className="w-full h-full"
                  src={courseDetails.promotion_video_url}
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-gray-900 rounded-lg mb-8 w-full">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {tCourse('noVideoAvailable')}
                </div>
              </div>
            )} */}

              {courseDetails.is_locked === false ? (
                <ContinueLearningMob isRTL={isRTL} locale={locale} semesterDetails={courseDetails} />
              ) : null}

              {/* Tabs */}
              <div className="w-full  lg:overflow-x-auto">
                <Tabs dir={`${locale === 'ar' ? 'rtl' : 'ltr'}`} defaultValue="information" className="mb-8">
                  <div className="overflow-x-auto">
                    <TabsList className="w-auto lg:w-full flex-nowrap bg-white ">
                      <TabsTrigger value="information" className="tabs-trigger">
                        {tTabs('information')}
                      </TabsTrigger>
                      <TabsTrigger value="playlist" className="tabs-trigger" disabled={true}>
                        {courseDetails.is_locked && <LockKeyhole size={15} />}

                        {tTabs('playlist')}
                      </TabsTrigger>
                      <TabsTrigger value="materials" disabled={courseDetails.is_locked} className="tabs-trigger">
                        {courseDetails.is_locked && <LockKeyhole size={15} />}
                        {tTabs('materials')}
                      </TabsTrigger>
                      <TabsTrigger
                        value="practicalExercises"
                        disabled={courseDetails.is_locked}
                        className="tabs-trigger"
                      >
                        {courseDetails.is_locked && <LockKeyhole size={15} />}
                        {tTabs('Practical exercises')}
                      </TabsTrigger>
                      <TabsTrigger value="discussions" disabled>
                        <LockKeyhole size={15} />
                        {tTabs('discussions')}
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="information" className="mt-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700">
                        {isRTL ? courseDetails.description_ar : courseDetails.description_en}
                      </p>
                      {/* Add more course details here */}
                    </div>
                  </TabsContent>
                  {/* <TabsContent value="playlist" className="mt-6">
                    <ChaptersFreeStudyAccordion
                      showDialog={showDialog}
                      courseDetails={courseDetails}
                      innerBackground="bg-[#F7F7F7CF]"
                      isPublic={true}
                    />
                  </TabsContent> */}
                  {/* <TabsContent value="materials" className="mt-6">
                    <MaterialsComp courseDetails={courseDetails} />
                  </TabsContent> */}
                  {/* <TabsContent value="practicalExercises" className="mt-6"> */}
                  {/* here should go the practicalExercises videos */}
                  {/* <PracticlaExercisesChapters courseDetails={courseDetails} />
                  </TabsContent> */}
                </Tabs>
              </div>
            </div>

            {courseDetails.is_locked === true && (
              <>
                {/* <SidebarSemester
                  paymentLink={`/dashboard/free-study/${courseDetails.slug}/payment`}
                  discount={discount}
                  semesterDetails={semesterDetails}
                  tCourse={tCourse}
                  price={courseDetails.price}
                  priceAfterDiscount={courseDetails.price_after_discount ?? undefined}
                /> */}

                {courseDetails.price_after_discount && (
                  <SidebarFreeStudy
                    paymentLink={`/dashboard/free-study/public/payment/${courseDetails.slug}`}
                    discount={discount}
                    freeStudyDetail={courseDetails}
                    tCourse={tCourse}
                    price={price}
                    priceAfterDiscount={courseDetails.price_after_discount}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeStudyPage;
