"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  FileText,
  Globe,
  Heart,
  LockKeyhole,
  Share2,
  Users,
} from "lucide-react";
import courseIcon from "@/public/images/MTN master.svg";
import { GoDotFill } from "react-icons/go";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { coursesData } from "@/app/components/ui/home/FreeStudiesComp";
import CourseCard from "@/app/components/common/CourseCard";

const page = () => {
  return (
    <div className=" overflow-x-hidden bg-[#f2f2f2]">
      <BreadcrumbFragment />
      {/* Course Header */}
      <div className="w-full p-4  px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <Image
                src={courseIcon}
                alt="Course Icon"
                width={64}
                height={64}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#10458c] break-words">
                  Classification Medicine
                </h1>
                <p className="text-gray-600 text-sm">
                  A course by{" "}
                  <span className="font-semibold">Ahmed Elelmallowy</span>
                </p>
              </div>
            </div>

            {/* Video Preview */}
            <div className="relative aspect-video bg-gray-900 rounded-lg mb-8 w-full">
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-blue-600 ml-1" />
                </div>
              </button>
            </div>

            {/* Tabs */}
            <div className="w-full overflow-x-auto">
              <Tabs defaultValue="information" className="mb-8 ">
                <TabsList className="w-full flex-nowrap">
                  <TabsTrigger value="information">Information</TabsTrigger>
                  <TabsTrigger value="semesters">Semesters</TabsTrigger>
                  <TabsTrigger value="placements" disabled>
                    <LockKeyhole size={15} />
                    Discussions{" "}
                  </TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="information" className="mt-6">
                  <h2 className="text-lg md:text-xl font-bold mb-4">
                    Learn to effectively bring data to life with creative
                    shapes, colors, and layouts
                  </h2>
                  <div className="prose max-w-none lg:my-10 my-6">
                    <p className="text-gray-700 mb-4">
                      For many people, images are the most effective way to
                      communicate information. Whether it be a social issue, a
                      personal story, or something you find joy in, any subject
                      can inspire a visualization. Data illustrator Sonja
                      Kuijpers specializes in turning numbers and information
                      into accessible works of art. She has worked with clients
                      including Philips, the Dutch government, and Frankfurter
                      Allgemeine Zeitung.
                    </p>
                    <p className="text-gray-700">
                      In this course, she gives you the tools you need to
                      transform data into captivating illustrations using
                      colors, shapes, and images. Discover how to collect and
                      analyze data sets, as well as how to transform them into a
                      unique poster that tells a story. Are you ready to create
                      your own data art?
                    </p>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold mb-4">
                    Who Can join this Diploma
                  </h2>
                  <div className="prose max-w-none">
                    <p className="flex items-center gap-4 self-stretch text-[#07519C]  text-base font-semibold ">
                      <GoDotFill />
                      <span>For many people</span>
                    </p>
                    <p className="self-stretch text-[#161616] text-base font-normal leading-[26.39px]">
                      In this course, she gives you the tools you need to
                      transform data into captivating illustrations using{" "}
                    </p>
                  </div>
                  <div className="prose max-w-none my-6">
                    <p className="flex items-center gap-4 self-stretch text-[#07519C]  text-base font-semibold ">
                      <GoDotFill />
                      <span>For many people</span>
                    </p>
                    <p className="self-stretch text-[#161616] text-base font-normal leading-[26.39px]">
                      In this course, she gives you the tools you need to
                      transform data into captivating illustrations using{" "}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="my-10">
              <h2 className="text-[#353535] text-[26px] lg:text-[40px] my-4 font-semibold leading-[45px]">
                Get Started with free study
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {coursesData.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 md:p-6 rounded-lg my-4 shadow-sm md:sticky md:top-4">
              <div className="mb-4">
                <div className="text-2xl md:text-3xl font-bold">$1300</div>
                <div className="text-red-500 text-sm">2400 %40 Discount</div>
              </div>

              <Button className="w-full bg-blue-600 mb-4">Enroll now</Button>

              <div className="flex justify-between items-center mb-4 gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Favorite
                </Button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 flex-shrink-0 text-gray-600" />
                  <span>9,140 students</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 flex-shrink-0 text-gray-600" />
                  <span>14 lessons (1h 43m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0 text-gray-600" />
                  <span>Online and at your own pace</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0 text-gray-600" />
                  <span className="break-words">
                    Available in English, Spanish, Portuguese, German, Italian
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

const BreadcrumbFragment = () => {
  return (
    <div className="text-blue-600 p-4 lg:px-[130px] bg-[#f2f2f2] w-full shadow-lg">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* <BreadcrumbLink href={`/academic-paths/${diploma.id}`}>Components</BreadcrumbLink> */}
            <BreadcrumbLink href={`/academic-paths/1}`}>
              Academic pass
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Classification Medicine</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default page;
