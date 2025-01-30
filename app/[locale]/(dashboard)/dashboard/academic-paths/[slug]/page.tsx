//academic path page

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, LockKeyhole } from "lucide-react";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import { useAcademicPathDetails } from "@/app/hooks/useAcademicPathDetails";
import { useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import { PathDetailsSkeleton } from "@/app/components/ui/home/PathDetailsSkeleton";
import { NotFoundState } from "@/app/components/common/NotFoundState";
import { SemestersTab } from "@/app/components/common/SemestersTab";
import { BreadcrumbFragment } from "@/app/components/common/BreadcrumbFragment";

const AcademicPathPage = () => {
  const { slug } = useParams();
  const { pathDetails, isLoading, error } = useAcademicPathDetails(
    slug as string
  );
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

  if (!pathDetails) {
    return <NotFoundState />;
  }

  return (
    <div dir={direction} className=" overflow-x-hidden bg-[#f2f2f2]">
      <BreadcrumbFragment
        pathName={isRTL ? pathDetails.name_ar : pathDetails.name_en}
        pathSlug={pathDetails.slug}
      />

      <div className="w-full p-4 px-4 max-w-7xl mx-auto">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <Image
                src={
                  isRTL ? pathDetails.image_url_ar : pathDetails.image_url_en
                }
                alt={isRTL ? pathDetails.name_ar : pathDetails.name_en}
                width={64}
                height={64}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                  {isRTL ? pathDetails.name_ar : pathDetails.name_en}
                </h1>
                <p className="text-gray-600 text-sm">
                  {tCourse("by")}{" "}
                  <span className="font-semibold">{"By Ahmed Eldmallawy"}</span>
                </p>
              </div>
            </div>

            {/* Video Preview */}
            {pathDetails.promotion_video_url ? (
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

            {/* Tabs */}
            <div className="w-full overflow-x-auto ">
              <Tabs defaultValue="information" className="mb-8">
                <TabsList className="w-full flex-nowrap bg-white">
                  <TabsTrigger value="information" className="tabs-trigger">
                    {tTabs("information")}
                  </TabsTrigger>
                  <TabsTrigger value="semesters" className="tabs-trigger">
                    {tTabs("semesters")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="discussions"
                    className="tabs-trigger"
                    disabled
                  >
                    <LockKeyhole size={15} />
                    {tTabs("discussions")}
                  </TabsTrigger>

                  {/* <TabsTrigger value="reviews">{tTabs("reviews")}</TabsTrigger> */}
                </TabsList>

                <TabsContent value="information" className="mt-6">
                  <h2 className="text-lg md:text-xl font-bold mb-4">
                    {isRTL
                      ? pathDetails.description_ar
                      : pathDetails.description_en}
                  </h2>

                  {(pathDetails.who_should_join_ar ||
                    pathDetails.who_should_join_en) && (
                    <>
                      <h2 className="text-lg md:text-xl font-bold mb-4">
                        {tCourse("whoShouldJoin")}
                      </h2>
                      <div className="prose max-w-none">
                        <p className="text-gray-700">
                          {isRTL
                            ? pathDetails.who_should_join_ar
                            : pathDetails.who_should_join_en}
                        </p>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="semesters">
                  <SemestersTab
                    semesters={pathDetails.semesters}
                    isRTL={isRTL}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1 lg:relative w-[90%] mx-4 fixed bottom-4 left-0 ">
            <div className="bg-white p-4 md:p-6 rounded-lg my-4 shadow-sm md:sticky md:top-4">
              <div className="mb-4">
                <div className="text-2xl text-center md:text-3xl font-bold">
                  ${pathDetails.price_after_discount || pathDetails.price}
                </div>
                {pathDetails.price_after_discount && (
                  <div className="text-red-500 text-center text-sm">
                    {tCourse("discount", {
                      price: pathDetails.price,
                      discount: (
                        ((pathDetails.price -
                          pathDetails.price_after_discount) /
                          pathDetails.price) *
                        100
                      ).toFixed(0),
                    })}
                  </div>
                )}
              </div>

              <Button className="w-full bg-blue-600 mb-4">
                {tCourse("enrollNow")}
              </Button>

              {/* <div className="flex justify-between items-center mb-4 gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  {tCourse("share")}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  {tCourse("favorite")}
                </Button>
              </div> */}

              <div className="space-y-4 text-sm">
                {pathDetails.languages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span className="break-words">
                      {tCourse("availableIn")}:{" "}
                      {pathDetails.languages.join(", ")}
                    </span>
                  </div>
                )}
                {/* Add other metadata as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error state component
const ErrorState = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f2f2f2] p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Error Loading Course
      </h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  );
};

export default AcademicPathPage;
