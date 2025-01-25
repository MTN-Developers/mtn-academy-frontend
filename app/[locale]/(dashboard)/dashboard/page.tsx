// Page.tsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/lib/redux/store";
import { fetchCourses } from "@/app/lib/redux/features/courseSlice";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ContinueLearningComp from "@/app/components/ui/home/ContinueLearningComp";
import { MainCarousel } from "@/app/components/ui/home/MainCarousel";

const Page = () => {
  const dispatch = useAppDispatch();
  const { status, error, items } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses({ page: 1, limit: 5000 }));
  }, [dispatch]);

  console.log("Redux State:", { status, error, items }); // Add this for debugging

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full bg-[#f2f2f2] p-4">
      <MainCarousel />
      {status === "loading" ? (
        <LoadingSpinner />
      ) : (
        <ContinueLearningComp />
      )}
    </div>
  );
};

export default Page;
