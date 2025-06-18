import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/system-img.svg';

const SystemSec = ({ handleBuy }: { handleBuy: () => void }) => {
  return (
    <div className="my-4 lg:mt-40 flex items-center p-4 lg:px-40 gap-4 justify-between flex-wrap">
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-4 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          السيستم{' '}
        </h1>
        <ul className="list-disc p-4 flex flex-col gap-4">
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              بنستخدم تقنيات / تكنولوجيا متقدمة جدا فى قياس وتحليل المشاعر ونوصل بدقة متناهية لعمق الشعور الشعور المضطرب
              المسبب للإضطراب فى المنظومة الشعورية للذكر والأنثى {' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              نساعد المشترك للوصول لعلاج نقطة الضعف المؤثرة سلبا على حياتهم {' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              والوصول لنتائج غير مسبوقة لم يصلوا لها من قبل{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              نسبة الأنوثة والذكورة & إختبار لوشر G+F ) {' '}
            </p>
          </li>
        </ul>
        <button onClick={() => handleBuy()} className="bg-[#902c86] px-4 py-[8px] lg:px-[44px] text-white rounded-md">
          أشترك الان
        </button>
      </div>

      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
    </div>
  );
};

export default SystemSec;
