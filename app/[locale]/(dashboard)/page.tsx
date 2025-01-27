// Page.tsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/lib/redux/store";
import { fetchCourses } from "@/app/lib/redux/features/courseSlice";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ContinueLearningComp from "@/app/components/ui/home/ContinueLearningComp";
import { MainCarousel } from "@/app/components/ui/home/MainCarousel";
import FreeStudiesComp from "@/app/components/ui/home/FreeStudiesComp";
import { usePathname } from "next/navigation";
import { getLangDir } from "rtl-detect";
import { DiplomaCarousel } from "@/app/components/ui/home/DiplomaCarousel";

const Page = () => {
  const dispatch = useAppDispatch();
  const { status, error, items } = useSelector(
    (state: RootState) => state.courses
  );
  const path = usePathname();
  const pathArr = path.split("/");
  const locale = pathArr[1];
  const direction = getLangDir(locale);

  useEffect(() => {
    dispatch(fetchCourses({ page: 1, limit: 5000 }));
  }, [dispatch]);

  console.log("Redux State:", { status, error, items }); // Add this for debugging

  return (
    <div dir={direction} className="w-full bg-[#f2f2f2] p-4">
      <MainCarousel key={locale} direction={direction} />
      {status === "loading" ? <LoadingSpinner /> : <ContinueLearningComp />}
      {status === "failed" && " error fetching courses"}
      {/* Add free studies component */}
      <FreeStudiesComp />
      {/* diploma carousel */}
      <DiplomaCarousel key={locale} direction={direction} />
    </div>
  );
};

export default Page;
