'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import bg from '@/public/icons/spiral.svg';
import { useParams } from 'next/navigation';

export default function HomeContent() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="mx-auto mt-10 md:mt-32 grid md:grid-cols-2 px-4 md:px-20">
      {/* Left Section with Background Image */}
      <div className="relative flex items-center justify-center w-full border-[#4A1D1F] border-0 md:border-0 md:border-r-2">
        <Image src={bg} alt="Background Image" className="hidden md:block md:absolute" />
        {/* Pseudo-element for the border */}
        <div className="absolute bottom-0 left-0 w-[25%] h-[1px] bg-[#4A1D1F] md:hidden"></div>
        <h1 className="text-2xl  md:text-6xl py-5 font-bold text-primary-blue">Signup now for free</h1>
      </div>

      {/* Right Section */}
      <div className="py-5 md:px-6 flex flex-col items-start justify-center">
        <p className="text-xl">
          اختار ما يناسبك من مجموعة شاملة من البرامج المختصة بكل ما يتعلق بتحسين حياتك والارتقاء بمشاعرك، لتنعكس على كل
          جوانب حياتك بالمزيد من الاتزان والصحة النفسية والجسدية
        </p>
        <Button className="bg-primary-blue mt-5 border-primary-blue min-w-fit hover:bg-primary-blue">
          {locale === 'ar' ? 'تسجيل الدخول' : 'Join now'}
        </Button>
      </div>
    </div>
  );
}
