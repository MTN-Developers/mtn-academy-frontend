import React from "react";
import LearningStudyProgressCard from "../../common/LearningStudyProgressCard";
import imagePlaceholder from "@/public/images/image-placeholder.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { useTranslations } from "next-intl";

export type Study = {
  id: number;
  title: string;
  progress: number;
  stage: string;
  image: string;
  mainCourses: MainCourse[];
};

export type MainCourse = {
  title: string;
  percentage: number;
  image: string;
  Courses: Course[] | [];
};

export type Course = {
  title: string;
  percentage: number;
  image: string;
};

// example of data structure
export const studies: Study[] = [
  {
    id: 1,
    title: "Pre Study",
    mainCourses: [
      {
        title: "Emotion Literacy",
        image: imagePlaceholder,
        Courses: [
          {
            title: "Fittra Therapy Gym",
            percentage: 80,
            image: imagePlaceholder,
          },
        ],
        percentage: 70, // In progress
      },
      {
        title: "Rational Feelings",
        image: imagePlaceholder,
        Courses: [],
        percentage: 0, // Not started
      },
    ],
    progress: 35, // In progress
    stage: "In Progress",
    image: imagePlaceholder,
  },
  {
    id: 2,
    title: "Technical Study",
    mainCourses: [
      {
        title: "Emotional Balance 1",
        image: imagePlaceholder,
        Courses: [],
        percentage: 100, // Completed
      },
      {
        title: "Lucsher Practitioner",
        image: imagePlaceholder,
        Courses: [],
        percentage: 100, // Completed
      },
    ],
    progress: 100, // Completed
    stage: "Completed",
    image: imagePlaceholder,
  },
  {
    id: 3,
    title: "Specialties",
    mainCourses: [
      {
        title: "Feeling Tamahy",
        image: imagePlaceholder,
        Courses: [],
        percentage: 0, // Not started
      },
    ],
    progress: 0, // Not started
    stage: "Not Started",
    image: imagePlaceholder,
  },
];

const ContinueLearningComp = () => {
  const t = useTranslations("home");
  //get all courses
  const { items: allCourses } = useSelector(
    (state: RootState) => state.courses
  );

  console.log("All courses is ", allCourses);

  // // Sort studies: In Progress first, then Not Started, then Completed
  // const sortedStudies = [...studies].sort((a, b) => {
  //   // If one is in progress (> 0 and < 100) and the other isn't
  //   const aInProgress = a.progress > 0 && a.progress < 100;
  //   const bInProgress = b.progress > 0 && b.progress < 100;

  //   if (aInProgress && !bInProgress) return -1;
  //   if (!aInProgress && bInProgress) return 1;

  //   // If neither is in progress, put not started (0%) before completed (100%)
  //   if (a.progress === 0 && b.progress === 100) return -1;
  //   if (a.progress === 100 && b.progress === 0) return 1;

  //   return 0;
  // });

  return (
    <div className="w-full max-w-[1005px]  lg:my-[60px] my-[20px] flex items-start justify-start   flex-col gap-4">
      <h1 className="text-2xl font-bold text-start">
        {t("Continue learning")}
      </h1>
      {allCourses.map((course) => (
        <LearningStudyProgressCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default ContinueLearningComp;
