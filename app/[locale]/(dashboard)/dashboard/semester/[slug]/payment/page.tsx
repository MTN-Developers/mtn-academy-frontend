'use client';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useSemesterDetails } from '@/app/hooks/useSemesterDetails';
import SemesterPaymentInfo from '@/app/components/ui/semester/SemesterPaymentInfo';
import { NotFoundState } from '@/app/components/common/NotFoundState';

import StepperPayment from '@/app/components/ui/payment/StepperPayment';

const Page = () => {
  const { slug } = useParams();

  const { data: semester, isLoading, error } = useSemesterDetails(slug as string);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !semester) {
    return <NotFoundState />;
  }

  return (
    <div className="size-full min-h-screen flex-wrap px-4 py-10 lg:p-0 gap-0 flex justify-between h-full bg-white rounded-lg shadow-md">
      <div className="w-full lg:w-1/2 lg:flex relative">
        <div
          className="relative lg:absolute w-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
          }}
        >
          <SemesterPaymentInfo semester={semester} />
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-[28px]">
        <div dir="rtl" className="w-[540px] min-h-full mx-auto h-fit p-4 max-w-full flex justify-center flex-col">
          <div className="flex flex-col gap-4">
            <StepperPayment semester={semester} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

/*
<div className="flex flex-col gap-4">
            <Image src={mtnLogo} width={150} height={150} className="mb-4" alt="MTN Live" />

            <p className="text-[32px] items-center gap-2 lg:text-4xl  font-sans font-medium leading-[normal] tracking-[0.72px]">
              ادفع الأن
            </p>

            <p className="w-fit flex items-center gap-2 max-w-full text-muted-foreground font-sans  text-xs font-normal leading-[150%] tracking-[0.24px]">
              قم بادخال بياناتك واستمتع بتجربه مستخدم ممتازه
            </p>
          </div>

          <SemesterPaymentForm semester={semester} />


*/
