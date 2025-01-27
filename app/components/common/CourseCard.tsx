import Image from "next/image";
import React from "react";
import { ICourseCard } from "../ui/home/FreeStudiesComp";
import { TruncatedText } from "./TruncatedText";
import { Heart, User } from "lucide-react";
interface CourseCardProps {
  course: ICourseCard;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const discountedPrice = course.pricing.discountPercentage
    ? course.pricing.originalPrice *
      (1 - course.pricing.discountPercentage / 100)
    : course.pricing.originalPrice;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative h-48">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6">
        <span className="inline-block px-3 py-1 text-sm bg-[#73b8ff] text-white rounded-full">
          {course.type}
        </span>

        <h2 className="flex  flex-col justify-center text-[#353535]  text-2xl font-medium leading-[54px]">
          <TruncatedText text={course.title} />
        </h2>
        <p className="flex  flex-col justify-center text-[#353535]  text-[13px] font-normal ">
          A course by {course.instructor.name}
        </p>

        <p className="mt-4 text-gray-700">{course.description}</p>

        <div className="flex  items-center mt-6 space-x-4">
          <div className="flex items-center">
            <span className=" flex justify-start items-center gap-1">
              <User />
              {course.stats.students}
            </span>
          </div>

          <div className="flex items-center">
            <span className="flex justify-start items-center gap-1">
              <Heart /> {course.stats.likes}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-[#07519C]  text-[32px] font-medium leading-[29px]">
            ${discountedPrice}
          </div>
          {course.pricing.discountPercentage && (
            <span className="text-red-500">
              %{course.pricing.discountPercentage} Discount
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
