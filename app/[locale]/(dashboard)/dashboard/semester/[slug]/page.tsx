// app/semester/[slug]/page.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, LockKeyhole } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import { PathDetailsSkeleton } from "@/app/components/ui/home/PathDetailsSkeleton";
import { NotFoundState } from "@/app/components/common/NotFoundState";
import { useSemesterDetails } from "@/app/hooks/useSemesterDetails";
import { BreadcrumbFragment } from "@/app/components/common/BreadcrumbFragment";
import { CoursesGrid } from "@/app/components/common/CoursesGrid";
import { ErrorState } from "@/app/components/common/ErrorState";

const SemesterPage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useSemesterDetails(slug as string);
  const semesterDetails = data?.data;

  const tCourse = useTranslations("course");
  const tTabs = useTranslations("tabs");
  const path = usePathname();
  const pathArr = path.split("/");
  const locale = pathArr[1];
  const direction = getLangDir(locale);
  const isRTL = direction === "rtl";

  if (isLoading) {
    return <PathDetailsSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!semesterDetails) {
    return <NotFoundState />;
  }

  return (
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
                src={
                  isRTL
                    ? semesterDetails.image_url_ar
                    : semesterDetails.image_url_en
                }
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
                  {tCourse("by")}{" "}
                  <span className="font-semibold">{"By Ahmed Eldmallawy"}</span>
                </p>
              </div>
              {/* Video Preview */}
              {semesterDetails.promotion_video_url ? (
                <div className="relative aspect-video bg-gray-900 rounded-lg mb-8 w-full">
                  {/* Add your video player component here */}
                </div>
              ) : (
                <div className="relative aspect-video bg-gray-900 rounded-lg mb-8 w-full">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {tCourse("noVideoAvailable")}
                  </div>
                </div>
              )}
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                  {isRTL ? semesterDetails.name_ar : semesterDetails.name_en}
                </h1>
                <p className="text-gray-600 text-sm">
                  {tCourse("semester")} {semesterDetails.order}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="w-full overflow-x-auto">
              <Tabs defaultValue="information" className="mb-8">
                <TabsList className="w-full flex-nowrap bg-white">
                  <TabsTrigger value="information" className="tabs-trigger">
                    {tTabs("information")}
                  </TabsTrigger>
                  <TabsTrigger value="courses" className="tabs-trigger">
                    {tTabs("courses")}
                  </TabsTrigger>
                  <TabsTrigger value="discussions" disabled>
                    <LockKeyhole size={15} />
                    {tTabs("discussions")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="information" className="mt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700">
                      {isRTL
                        ? semesterDetails.description_ar
                        : semesterDetails.description_en}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="courses">
                  <CoursesGrid
                    courses={semesterDetails.courses}
                    isRTL={isRTL}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1 lg:relative w-[90%] mx-4 fixed bottom-4 left-0 ">
            <div className="bg-white p-4 md:p-6 rounded-lg my-4 shadow-sm md:sticky md:top-4">
              <Button className="w-full bg-blue-600 mb-4">
                {tCourse("startLearning")}
              </Button>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0 text-gray-600" />
                  <span className="break-words">
                    {tCourse("semesterOrder", { order: semesterDetails.order })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterPage;
