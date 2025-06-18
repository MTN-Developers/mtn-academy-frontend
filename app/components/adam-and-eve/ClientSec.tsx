import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/client-img.svg';

const ClientSec = ({ handleBuy }: { handleBuy: () => void }) => {
  return (
    <div className="my-10 lg:my-40 lg:px-40 flex lg:flex-row  flex-col-reverse  items-center p-4 gap-6 justify-between flex-wrap">
      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-4 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          العميل
        </h1>
        <ul className="list-disc p-4 flex flex-col gap-4">
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
                أى ذكر وأنثى متجوزين وحابيين يطورا من علاقتهم العاطفية وحياتعم الزوجية{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              أى ذكر وأنثى متجوزين وعندهم مشاكل فى علاقتهم العاطفية والجنسية{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              أى ذكر وأنثى مقبلين على الزواج ( سواء للتوعية او لعلاج مخاوفهم ) {' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              أى ذكر وأنثى مقبلين على الطلاق ومش شايفيين ان فيها أمل {' '}
            </p>
          </li>
        </ul>
        <button onClick={() => handleBuy()} className="bg-[#902c86] px-4 py-[8px] lg:px-[44px] text-white rounded-md">
          أشترك الان
        </button>
      </div>
    </div>
  );
};

export default ClientSec;
