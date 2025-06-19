import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/content-img.svg';

const ContentSec = () => {
  return (
    <div className="my-4 lg:mt-40 flex items-center p-4 lg:px-40 gap-4 justify-between flex-wrap">
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-4 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          محتوى البرنامج للرجال{' '}
        </h1>
        <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          للرجال: استعد ذكورتك القيادية وعِش رجولتك الحقيقية! في عالم اليوم، يجد الكثير من الرجال أنفسهم في حيرة وتيه.
          هل تشعر بأنك:{' '}
        </p>
        <ul className="list-disc my-4 lg:px-10">
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              لا تعرف كيف تكون الذكر الحقيقي وكيف تعبّر عن رجولتك؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              فقدت دورك القيادي الفطري وتشعر بالتبعية في حياتك وعلاقاتك؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              تخلط بين الحزم والحدة، أو تتنازل عن مبادئك بحجة الرحمة !{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              تعاني من الشعور بالضعف، عدم التأثير، وعدم القدرة على الإنجاز على أرض الواقع؟{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              دائمًا ما تشعر بالقلق والخوف، وتنتظر من الآخرين تأكيد قيمتك أو مهارتك أو مساعدتك؟{' '}
            </p>
          </li>
        </ul>
        <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
          الألم عميق: هذا الشعور بالإفتقار للقيادة، والخوف، والاعتماد على الآخرين، والتنازل عن المبادئ، يجعل حياتك مجرد
          حلم بعيد المنال. 
          <br /> تشعر أنك &quot;ماشي جنب الحيط&quot;، وأن إنجازاتك الحقيقية لن تتحقق أبداً{' '}
        </p>
      </div>

      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
    </div>
  );
};

export default ContentSec;
