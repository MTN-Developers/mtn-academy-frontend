import Image from "next/image";
import React from "react";
import { ICourseCard } from "../ui/home/FreeStudiesComp";
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
        <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
          {course.type}
        </span>

        <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
        <p className="text-gray-600 mt-2">
          A course by {course.instructor.name}
        </p>

        <p className="mt-4 text-gray-700">{course.description}</p>

        <div className="flex items-center mt-6 space-x-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {/* User icon */}
            </svg>
            <span className="ml-2">{course.stats.students}</span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {/* Heart icon */}
            </svg>
            <span className="ml-2">{course.stats.likes}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
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
