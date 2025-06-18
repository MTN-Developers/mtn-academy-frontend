import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/content-sec-img.svg';

const ObstSec = () => {
  return (
    <div className="my-4 lg:mt-40 flex items-center p-4 lg:px-40 gap-4 justify-between flex-wrap">
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-6 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          العوائق
        </h1>
        <p className="self-stretch text-right justify-start my-4 text-slate-900 text-base lg:text-xl font-normal">
          الأزمة اللى الناس عايشاها هى ان كل واحد فاهم ان المشكلة عند الطرف الآخر ، ليه حياتى بايظة ؟ ليه مش مرتاح فى
          علاقاتي ؟ عشان مراتى مقرفة ، عشان جوزى مش نضيف ، عشان جوزى مش راجل ، عشان مراتي زنانة او غبية ، اصل جوزى
          مابيحبنيش ، لا هى اللى مركزة مع العيال ومش معبراني{' '}
        </p>

        <p className="text-[#902c86] text-3xl font-normal">لكن ...</p>
        <p className="self-stretch my-4 text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          العلاقة الزوجية بتبدأ من عندى أنا مش عند الطرف الآخر ، والطرف الآخر بيبدأ يتزن قصادي لما اكون انا أكثر إتزان
          وبعيش هويتى النوعية بقوة وجمال 
        </p>
        <p className="self-stretch my-4 text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          العائق الثاني : هو ان محدش عارف دوره فى العلاقة لا الأنثى عارفة دورها ولا الذكر عارف دوره 
        </p>
      </div>

      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
    </div>
  );
};

export default ObstSec;
