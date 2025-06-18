import React from 'react';
import heroBanner from '@/public/images/adam-and-eve/hero-banner.png';
import heroBannerMob from '@/public/images/adam-and-eve/hero-img-mob.svg';
import logo from '@/public/images/adam-and-eve/logo-only.svg';
import Text from '@/public/images/adam-and-eve/text-only.svg';
import Image from 'next/image';

const HeroSec = () => {
  const webFragment = (
    <div className="hidden lg:block lg:relative  w-full lg:h-[750px] bg-[#f7f7f7] ">
      <Image src={heroBanner} alt="eve banner" className=" object-contain   " />
      <div className="absolute top-[150px] right-[80px]">
        <Image src={logo} width={77} height={66} alt="logo" className="mb-4" />
        <Image src={Text} width={234} height={74} alt="logo" className="mb-4" />
        <h1 className="opacity-80 lg:mb-4 text-right justify-start text-slate-900 text-xl font-semibold">
          رحلة استكشاف الجمال الفطري في العلاقة بين الذكر والأنثى
        </h1>
        <p className="max-w-[649px] mb-6 text-right justify-start text-neutral-600 text-xl font-normal">
          {' '}
          في هذا البرنامج الاستثنائي، سنأخذك في رحلة مختلفة تمامًا لفهم من هو الذكر ومن هي الأنثى من منظور فطري وإنساني،
          من خلال علم نفس الألوان وتحليل المشاعر العميق.
        </p>
        <button className="bg-[#902c86] py-[8px] lg:px-[44px] text-white rounded-md">أشترك الان</button>
      </div>
    </div>
  );

  const mobileFragment = (
    <div
      className="
      w-full
      block
      lg:hidden
      bg-[#f7f7f7] "
    >
      <Image src={heroBannerMob} alt="eve banner" className=" object-contain   " />
      <div className="absolute flex flex-col items-center justify-center top-[250px] right-[0px] p-4">
        <Image src={logo} width={77} height={66} alt="logo" className="mb-6" />
        <Image src={Text} width={234} height={74} alt="logo" className="mb-6" />
        <h1 className="opacity-80 mb-6 lg:mb-4 text-center text-slate-900 text-xl font-semibold">
          رحلة استكشاف الجمال الفطري في العلاقة بين الذكر والأنثى
        </h1>
        <p className="max-w-[649px] mb-6 text-center text-neutral-600 text-xl font-normal">
          في هذا البرنامج الاستثنائي، سنأخذك في رحلة مختلفة تمامًا لفهم من هو الذكر ومن هي الأنثى من منظور فطري وإنساني،
          من خلال علم نفس الألوان وتحليل المشاعر العميق.
        </p>
        {/* <button className="bg-[#902c86] py-[8px] lg:px-[44px] text-white rounded-md">أشترك الان</button> */}
      </div>
    </div>
  );

  return (
    <>
      {webFragment}
      {mobileFragment}
    </>
  );
};

export default HeroSec;
