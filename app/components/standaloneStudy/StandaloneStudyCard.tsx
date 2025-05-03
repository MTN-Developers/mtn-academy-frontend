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
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      {study.banner_ar && study.banner_en && (
        <Link href={`${locale}/dashboard/free-study/${study.slug}`}>
          <Image className="rounded-t-lg" src={locale === 'ar' ? study.banner_ar : study.banner_en} alt="" />
        </Link>
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
