'use client';

import { FreeStudyCourse } from '@/app/types/freeStudy';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

type Props = {
  study: FreeStudyCourse;
};

const StandaloneStudyCard = ({ study }: Props) => {
  const param = useParams();
  const locale = param.locale as string;
  return (
    <Link
      href={`/dashboard/free-study/${study.slug}`}
      className="rounded-lg my-1  cursor-pointer hover:shadow-2xl overflow-hidden shadow-lg bg-white"
    >
      {study.logo_ar && study.logo_en && (
        <div className="relative h-48">
          <Image
            className="rounded-t-lg"
            src={locale === 'ar' ? study.logo_ar : study.logo_en}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2  tracking-tight ext-[#353535]  text-xl font-medium my-4 dark:text-white">
            {locale === 'ar' ? study.name_ar : study.name_en}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {locale === 'ar' ? study.description_ar?.slice(0, 120) : study.description_en?.slice(0, 120)}
        </p>
      </div>
    </Link>
  );
};

export default StandaloneStudyCard;
