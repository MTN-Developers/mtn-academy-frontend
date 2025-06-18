import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/content-sec-img.svg';

const SufferSec = () => {
  return (
    <div className="my-10 lg:my-40 lg:px-40 flex lg:flex-row  flex-col-reverse  items-center p-4 gap-6 justify-between flex-wrap">
      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-4 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          المعاناة
        </h1>

        <p className="text-white text-3xl font-normal"> نتيجة هذا الحال يعيش كلا الطرفين</p>
        <ul className="list-disc p-4">
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              ان كل ذكر وأنثى سيرى نفسه والطرف الآخر من منظور مختلف تماما عما كان يعرف به نفسه والجنس الآخر 
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              وبالتالى سيحدث نقلة شعورية وادراكية فى علاقاته وتفاعلاته اليومية مع نفسه والآخرين 
            </p>
          </li>
        </ul>
        <button className="bg-[#902c86] py-[8px] lg:px-[44px] text-white rounded-md">أشترك الان</button>
      </div>
    </div>
  );
};

export default SufferSec;
