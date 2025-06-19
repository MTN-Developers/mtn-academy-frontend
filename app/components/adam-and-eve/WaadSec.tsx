import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/waad-img.svg';

const WaadSec = ({ handleBuy }: { handleBuy: () => void }) => {
  return (
    <div className="my-10 lg:my-40 lg:px-40 flex lg:flex-row  flex-col-reverse  items-center p-4 gap-6 justify-between flex-wrap">
      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-4 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          محتوى البرنامج للنساء
        </h1>
        <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          اكتشفي أنوثتك المتوازنة وعيشي دورك الريادي الفطري!{' '}
        </p>
        <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          وكذلك النساء، يواجهن تحديات فريدة في رحلة اكتشاف الذات
        </p>
        <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          هل تشعرين بأنك:
        </p>
        <ul className="list-disc my-4 lg:px-10">
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              لا تعرفين كيف تكونين الأنثى الحقيقية وكيف تعبّرين عن أنوثتك ودورك الريادي؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              تخلطين بين القسوة والطموح، أو بين التضحية أو نبذ الذات و الحنية ؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              لـديك رغبة ملحة في الاستقلال والتمرد، ولكنك في الوقت نفسه تخافين من الوحدة والمستقبل؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              تنكرين حاجتك الفطرية للرجل، وفي نفس الوقت ترفضين دوره البديل في حياتك، في صراع داخلي يجعلك تشعرين
              &quot;أنا راجل وست في بعض&quot;؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              تملكين حاجة عميقة للأمان والدلال والرعاية، وتخافين بشدة من الفقدان (مكانة، ممتلكات، أو علاقة أو حب)؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              ترغبين في أن تُشاهدي&quot; شعور إنك تكوني متشافة &quot; وتُحبي، وتخافين من عدم رؤية الآخرين لجمالك وقيمتك
              ومدى تأثيرك فى حياتهم ؟{' '}
            </p>
          </li>
        </ul>
        <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          الألم الحقيقي: هذا التناقض الداخلي والخوف المستمر من الفقدان، مع الرغبة الملحة في الأمان والتدليل، يجعلك
          تشعرين بالضياع وعدم القدرة على عيش ذاتك الأنثوية الحقيقية.
        </p>
        <button
          onClick={() => handleBuy()}
          className="bg-[#902c86] py-[8px] my-4 px-4 lg:px-[44px] text-white rounded-md"
        >
          أشترك الان
        </button>
      </div>
    </div>
  );
};

export default WaadSec;
