'use client';

import useGetAllFreeStudies from '@/app/hooks/useGetAllFreeStudies';
import { FreeStudyCourse } from '@/app/types/freeStudy';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import StandaloneStudyCard from './StandaloneStudyCard';
import StudyCard from '@/app/Sitecomponents/common/home/StudyCard';

type props = {
  isPublic?: boolean;
};

const StandaloneStudy = ({ isPublic }: props) => {
  const param = useParams();
  const locale = param.locale as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [allStudies, setAllStudies] = useState<FreeStudyCourse[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { data, error, isError, isLoading, isFetching } = useGetAllFreeStudies({
    limit: 4,
    page: currentPage,
    isPublic: isPublic,
  });

  useEffect(() => {
    if (data?.data.meta) {
      setTotalPages(data.data.meta.totalPages);
    }
  }, [data?.data.meta]);

  useEffect(() => {
    if (!data?.data.data) return;

    setAllStudies(
      prev =>
        currentPage === 1
          ? data.data.data // first page → replace
          : [...prev, ...data.data.data], // other pages → append
    );
  }, [data?.data.data, currentPage]);

  if (isLoading && currentPage === 1) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    // return <>Error...</>;
  }

  const hasMore = currentPage < totalPages;

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {isPublic && allStudies.length > 0 ? (
        <div className="container md:w-[80%] mx-auto mt-20">
          <h2 className="text-[#353535] lg:text-[40px] my-4 font-semibold leading-[45px]">
            {locale === 'ar' ? 'برامج حرة' : 'Free Studies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
            {allStudies.map(study => (
              <StudyCard
                key={study.id}
                description_ar={study.description_ar as string}
                description_en={study.description_en as string}
                image_url_en={study.logo_en as string}
                name_ar={study.name_ar}
                name_en={study.name_en}
                routingUrl={`/${locale}/dashboard/free-study/public/${study.slug}`}
              />
            ))}
          </div>

          {hasMore && (
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={isFetching}
              className="mt-4 text-blue-600 hover:text-blue-800 disabled:opacity-50"
            >
              {isFetching ? 'Loading...' : 'See More'}
            </button>
          )}
        </div>
      ) : (
        <div className="lg:my-10 my-4 p-4">
          <h2 className="text-[#353535] lg:text-[40px] my-4 font-semibold leading-[45px]">
            {locale === 'ar' ? 'برامج متخصصة' : 'Free Studies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {allStudies.map(study => (
              <StandaloneStudyCard
                key={study.id}
                link={
                  isPublic
                    ? `/${locale}/dashboard/free-study/public/${study.slug}`
                    : `/${locale}/dashboard/free-study/${study.slug}`
                }
                study={study}
              />
            ))}
          </div>

          {hasMore && (
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={isFetching}
              className="mt-4 text-blue-600 hover:text-blue-800 disabled:opacity-50"
            >
              {isFetching ? 'Loading...' : 'See More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StandaloneStudy;
