import ContinueLearningComp from "@/app/components/ui/home/ContinueLearningComp";
import { MainCarousel } from "@/app/components/ui/home/MainCarousel";
import React from "react";

const page = () => {
  return (
    <div className="w-full bg-[#f2f2f2] p-4 ">
      <MainCarousel />
      <ContinueLearningComp />
    </div>
  );
};

export default page;
