import Image from 'next/image';
import React from 'react';
import { TruncatedText } from './TruncatedText';

import { SemesterDetails } from '@/app/types/semester';
import Link from 'next/link';
interface SemesterCardProps {
  semester: SemesterDetails;
  direction: string;
}

const SemesterCard = ({ semester, direction }: SemesterCardProps) => {
  const routingLink =
    semester.id === '20d67b1a-0d30-4d77-9cfe-efbbd3c8c611' || semester.id === '8494e37c-2304-4c19-9a31-c9eaf07bbef4'
      ? `dashboard/semester/${semester.id}`
      : '#';


  // const routingLink = `dashboard/semester/${semester.id}`;

  return (
    <Link
      href={routingLink}
      className="rounded-lg my-1  cursor-pointer hover:shadow-2xl overflow-hidden shadow-lg bg-white"
    >
      <div className="relative h-48">
        <Image
          src={direction === 'ltr' ? semester.image_url_en : semester.image_url_ar}
          alt={semester.name_en}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6">
        {/* <span className="inline-block px-3 py-1 text-sm bg-[#73b8ff] text-white rounded-full">{course.type}</span> */}

        <h2 className="flex  flex-col justify-center  text-[#353535]  text-xl font-medium my-4">
          <TruncatedText text={direction === 'ltr' ? semester.name_en : semester.name_ar} />
        </h2>
        {/* <p className="flex  flex-col justify-center text-[#353535]  text-[13px] font-normal ">
          A course by {course.instructor.name}
        </p> */}

        <p className="mt-4 text-gray-700">
          {direction === 'ltr' ? semester.description_en.slice(0, 80) : semester.description_ar.slice(0, 80)}
        </p>

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
    </Link>
  );
};

export default SemesterCard;
