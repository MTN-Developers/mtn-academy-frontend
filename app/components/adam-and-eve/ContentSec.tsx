import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/content-img.svg';

const ContentSec = () => {
  return (
    <div className="my-4 lg:mt-40 flex items-center p-4 lg:px-40 gap-4 justify-between flex-wrap">
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-4 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          محتوى البرنامج
        </h1>
        <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          يعرفنا من هو الذكر بمشاعره واحواله وهويته المختلفة تماما عن الانثى  وبالتالى سنتعرف على احوال الأنثى ومشاعرها
          المتزنة والمضطربة لكل من الذكر والانثى من خلال المنظومة الفطرية الإنسانية للمشاعر والقائمة على علم نفس
          الالوان 
        </p>
      </div>

      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
    </div>
  );
};

export default ContentSec;
