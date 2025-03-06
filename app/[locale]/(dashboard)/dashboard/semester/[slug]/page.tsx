// app/semester/[slug]/page.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LockKeyhole } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import { PathDetailsSkeleton } from '@/app/components/ui/home/PathDetailsSkeleton';
// import { NotFoundState } from '@/app/components/common/NotFoundState';
import { useSemesterDetails } from '@/app/hooks/useSemesterDetails';
import { BreadcrumbFragment } from '@/app/components/common/BreadcrumbFragment';
import { CoursesGrid } from '@/app/components/common/CoursesGrid';
import { ErrorState } from '@/app/components/common/ErrorState';
import Link from 'next/link';

const SemesterPage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useSemesterDetails(slug as string);
  const semesterDetails = data;

  // console.log('sesmter ails ', semesterDetails);

  const tCourse = useTranslations('course');
  const tTabs = useTranslations('tabs');
  const path = usePathname();
  const pathArr = path.split('/');
  const locale = pathArr[1];
  const direction = getLangDir(locale);
  const isRTL = direction === 'rtl';
  // const router = useRouter();

  // const handleEnrollNow = () => {
  //   if (semesterDetails) {
  //     router.push(`/payment`);
  //   }
  // };

  if (isLoading) {
    return <PathDetailsSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  // if (!semesterDetails) {
  //   return <NotFoundState />;
  // }

  return (
    <>
      {semesterDetails && (
        <div dir={direction} className="overflow-x-hidden bg-[#f2f2f2]">
          <BreadcrumbFragment
            pathName={isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
            pathSlug={semesterDetails.slug}
          />

          <div className="w-full p-4 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Content */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <Image
                    src={isRTL ? semesterDetails.image_url_ar : semesterDetails.image_url_en}
                    alt={isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                      {isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {tCourse('by')} <span className="font-semibold">{'By Ahmed Eldmallawy'}</span>
                    </p>
                  </div>
                  {/* Video Preview */}
                  {semesterDetails.promotion_video_url ? (
                    <div className="relative aspect-video  rounded-lg mb-8 w-full">
                      {/* Add your video player component here */}
                      <iframe
                        style={{
                          borderRadius: '20px',
                        }}
                        allowFullScreen
                        allow="autoplay; fullscreen; picture-in-picture pip"
                        key={semesterDetails.id}
                        className="w-full h-full"
                        src={semesterDetails.promotion_video_url}
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
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                      {isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {tCourse('semester')} {semesterDetails.order}
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="w-full overflow-x-auto">
                  <Tabs defaultValue="information" className="mb-8">
                    <TabsList className="w-full flex-nowrap bg-white">
                      <TabsTrigger value="information" className="tabs-trigger">
                        {tTabs('information')}
                      </TabsTrigger>
                      <TabsTrigger value="courses" className="tabs-trigger">
                        {tTabs('courses')}
                      </TabsTrigger>
                      <TabsTrigger value="discussions" disabled>
                        <LockKeyhole size={15} />
                        {tTabs('discussions')}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="information" className="mt-6">
                      <div className="prose max-w-none">
                        <p className="text-gray-700">
                          {isRTL ? semesterDetails.description_ar : semesterDetails.description_en}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="courses">
                      <CoursesGrid courses={semesterDetails.courses} isRTL={isRTL} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Right Sidebar on web */}
              <div className="md:col-span-1 hidden lg:block lg:relative w-[90%] mx-4 fixed bottom-4 left-0 font-poppins">
                <div className="bg-white p-4 md:p-6 rounded-lg my-4 shadow-sm md:sticky md:top-4 flex flex-col gap-3 justify-start items-center">
                  <p className="text-2xl font-normal text-[#353535]">{tCourse('enrollNow')}</p>
                  <div className="text-[64px] font-bold mb-2">${semesterDetails.price_after_discount}</div>
                  <p className="text-center text-sm font-normal  text-red-400 ">
                    <span className="line-through">${semesterDetails.price}</span>
                    <span className="text-red-400 inline mx-2 text-lg">
                      %{((semesterDetails.price - semesterDetails.price_after_discount) / 100).toFixed(0)} Discount
                    </span>
                  </p>
                  <p className="text-center text-sm font-normal text-[#454545]">{tCourse('enjoyTheCourse')}</p>
                  <Link className="w-full" href={`/dashboard/semester/${semesterDetails.id}/payment`}>
                    <Button className="w-full bg-[#07519C] mb-4 text-lg h-14">{tCourse('enrollNow')}</Button>
                  </Link>

                  <div className="space-y-4 text-sm">
                    {/* <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 flex-shrink-0 text-gray-600" />
                      <span className="break-words">
                        {semesterDetails.
                          ? `${courseDetails.course_duration} ${tCourse('hours')}`
                          : tCourse('durationNotSpecified')}
                      </span>
                    </div> */}
                    {/* Add more course metadata here */}
                  </div>
                </div>
              </div>

              {/* Right Sidebar on mobile */}
              <div className="md:col-span-1 p-4 rounded-lg bg-white block lg:hidden lg:relative w-[90%] mx-4 fixed bottom-4 left-0 font-poppins">
                <p className="text-center flex items-center text-sm font-normal  text-red-400 ">
                  <span className="line-through">${semesterDetails.price}</span>
                  <span className="text-red-400 text-nowrap inline mx-2 text-sm">
                    %{((semesterDetails.price - semesterDetails.price_after_discount) / 100).toFixed(0)} Discount
                  </span>
                </p>
                <div className="   my-4 shadow-sm md:sticky md:top-4 flex  gap-3 justify-start items-center">
                  <div>
                    <div className="text-[30px] font-bold mb-2">${semesterDetails.price_after_discount}</div>
                  </div>
                  <Link className="w-full" href={`/dashboard/semester/${semesterDetails.id}/payment`}>
                    <Button className="w-full bg-[#07519C]  text-lg h-14">{tCourse('enrollNow')}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SemesterPage;
