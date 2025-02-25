import Image from 'next/image';
import React from 'react';
// import { ICourseCard } from "../ui/home/FreeStudiesComp";
import { TruncatedText } from './TruncatedText';
// import { Heart, User } from 'lucide-react';
import { Course } from '@/app/types/course';
interface CourseCardProps {
  course: Course;
  direction: string;
}

const CourseCard = ({ course, direction }: CourseCardProps) => {
  // const discountedPrice = course.pricing.discountPercentage
  //   ? course.pricing.originalPrice *
  //     (1 - course.pricing.discountPercentage / 100)
  //   : course.pricing.originalPrice;

  return (
    <div className="rounded-lg my-1  overflow-hidden shadow-lg bg-white">
      <div className="relative h-48">
        <Image
          src={direction === 'ltr' ? course.logo_en : course.logo_ar}
          alt={course.name_en}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6">
        {/* <span className="inline-block px-3 py-1 text-sm bg-[#73b8ff] text-white rounded-full">{course.type}</span> */}

        <h2 className="flex  flex-col justify-center  text-[#353535]  text-xl font-medium my-4">
          <TruncatedText text={direction === 'ltr' ? course.name_en : course.name_ar} />
        </h2>
        {/* <p className="flex  flex-col justify-center text-[#353535]  text-[13px] font-normal ">
          A course by {course.instructor.name}
        </p> */}

        <p className="mt-4 text-gray-700">{direction === 'ltr' ? course.description_en : course.description_ar}</p>

        {/* <div className="flex  items-center mt-6 space-x-4">
          <div className="flex items-center">
            <span className=" flex justify-start items-center gap-1">
              <User />
              1150
            </span>
          </div>

          <div className="flex items-center">
            <span className="flex justify-start items-center gap-1">
              <Heart /> 880
            </span>
          </div>
        </div> */}

        {/* <div className="mt-6 flex items-center justify-between">
          <div className="text-[#07519C]  text-[32px] font-medium leading-[29px]">${discountedPrice}</div>
          {course.pricing.discountPercentage && (
            <span className="text-red-500">%{course.pricing.discountPercentage} Discount</span>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CourseCard;
