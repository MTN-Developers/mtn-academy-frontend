import React from "react";
import { Study } from "../ui/home/ContinueLearningComp";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Dot, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TruncatedText } from "./TruncatedText";

const LearningStudyProgressCard = ({ study }: { study: Study }) => {
  // Get the appropriate course to show
  const courseToShow =
    study.mainCourses.find((course) => {
      if (study.progress === 100) {
        // For completed studies, show the last course
        return course.percentage === 100;
      } else {
        // For in-progress or not started studies, show the first incomplete course
        return course.percentage < 100;
      }
    }) || study.mainCourses[0];

  return (
    <div className="bg-white w-fit lg:w-[1005px] flex gap-4 items-stretch overflow-hidden shadow-sm rounded-3xl lg:py-[14px] lg:px-[24px]">
      <Image
        src={study.image}
        alt="study image"
        width={200}
        height={140}
        className="rounded-2xl shadow-2xl"
      />
      <div className="lg:w-[420px] flex flex-col justify-end lg:me-[32px]">
        <p className="text-sm block font-bold">{study.title}</p>
        <p className="text-[#07519C] lg:text-[32px] font-medium leading-[45px]">
          <TruncatedText text={courseToShow.title} />
        </p>
        <div className="my-4 w-full">
          <Progress
            value={courseToShow.percentage}
            className={`w-[100%] bg-gray-200 ${
              courseToShow.percentage === 100
                ? "[&>div]:bg-[#2563eb]" // Blue for completed
                : "[&>div]:bg-[#009b4e]" // Green for in progress
            }`}
          />
        </div>
      </div>
      {/* the big separator */}
      <div className="w-[2px] bg-gray-500 self-stretch" />
      {/* watching details */}
      <div className="flex flex-col justify-between">
        <p className="font-light text-sm">Up Next</p>
        <div className="flex items-center gap-4 text-blue-600">
          <Video />
          <p>EPOSIDE 2 PART FOUR</p>
        </div>
        <div className="flex items-center justify-center gap-2    ">
          <p className="line-clamp-2 text-sm font-semibold text-nowrap text-[#303141]">
            <TruncatedText text={courseToShow.title} />
          </p>
          {/* watching place */}
          <div className="  !w-[1px] !h-4 bg-[#303141]"></div>
          <div className="flex items-center justify-center">
            <p>Video</p>
            <Dot width={30} height={30} />
            <p>4 min</p>
          </div>
        </div>
        {/* continue button */}
        <Button
          variant="outline"
          className="w-[210px] border-blue-500 text-blue-500 text-md hover:bg-blue-500 hover:text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default LearningStudyProgressCard;
