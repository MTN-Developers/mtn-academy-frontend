'use client';
import FreeStudyPaymentInfo from '@/app/components/ui/freeStudies/FreeStudyPaymentInfo';
import StepperAuth from '@/app/components/ui/freeStudies/StepperAuth';
import UseGetFreeStudy from '@/app/hooks/UseGetFreeStudy';
// import StepperAuth from '@/components/auth/StepperAuth';
// import GroupPaymentInfo from '@/components/dashboard/payment/GroupPaymentInfo';
// import useGetGroupById from '@/hooks/groups/useGetGroupById';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const params = useParams();
  // console.log(params.id);
  const { data, isError, error, isLoading } = UseGetFreeStudy({
    slug: params.slug as string,
    isPublic: true,
  });

  const freeStudy = data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>error</div>;
  }

  return (
    <div className="w-full  flex flex-col flex-col-reverse lg:flex-row   gap-4 flex-wrap mb-10  justify-center ">
      <div className=" flex-1   ">{freeStudy && <StepperAuth freeStudy={freeStudy} />}</div>
      <div className="w-full lg:pt-20 lg:w-[40%]">{freeStudy && <FreeStudyPaymentInfo freeStudy={freeStudy} />}</div>
    </div>
  );
};

export default Page;
