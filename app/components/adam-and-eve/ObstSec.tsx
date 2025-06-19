import Image from 'next/image';
import React from 'react';
import contentSecImg from '@/public/images/adam-and-eve/obst-img.svg';

const ObstSec = () => {
  return (
    <div className="my-4 lg:mt-40 flex items-center p-4 lg:px-40 gap-4 justify-between flex-wrap">
      <div className="lg:flex-1">
        <h1 className="self-stretch mb-6 text-right justify-start text-slate-900 text-2xl lg:text-6xl font-extrabold ">
          الوقت ينفد
        </h1>
        <p className="text-[#33519e] text-3xl font-normal">للرجال ...</p>

        <ul className="list-disc my-4 lg:px-10">
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              الكبت العاطفي والجنسي السائد في مجتمعاتنا اليوم جعل الكثير من الرجال &quot;مكاسير وضعاف&quot;.{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              العلاقة بالأنثى أصبحت مجرد &quot;مصاحبة ولطف&quot; بدلاً من أن تكون علاقة قوامة واختراق حقيقي.{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              حان الوقت لتستعيد فطرتك ورجولتك من لحظة بلوغك!{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              ليس عليك الانتظار حتى &quot;تتخرج وتشتغل&quot; لتصبح &quot;رجلاً&quot; فى نظر نفسك ونظر المجتمع لك.{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              إذا لم تعش هذه الفطرة في كل موقف وعلاقة، فأنت متأخر بالفعل!{' '}
            </p>
          </li>
        </ul>

        <p className="text-[#902c86] text-3xl font-normal">للنساء ...</p>
        <ul className="list-disc my-4 lg:px-10">
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              رغبتك الفطرية في الأمومة والاحتواء تبدأ مبكراً، وكل تأخير عن عيش هذه الفطرة يجعلك تشعرين بالجنون أكثر.{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              نشعر بكِ !{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              لكن المجتمع يخبرك: &quot;أنتِ ما زلت صغيرة&quot;،&quot;عيشي سنك&quot;، &quot;اعملي كاريرك&quot;،
              &quot;ابني مستقبلك&quot;. {' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              لا تدعي هذه الرسائل توقفك عن استعادة أنوثتك الكاملة ودورك الريادي الآن!{' '}
            </p>
          </li>
          <li>
            <p className="self-stretch text-right justify-start text-slate-900 text-base lg:text-xl font-normal">
              لا تنتظر لحظة أخرى لتستعيد حياتك، قوتك، وحريتك.{' '}
            </p>
          </li>
        </ul>
      </div>

      <div className="lg:flex-1">
        <Image src={contentSecImg} alt="banner" width={600} height={334} className="w-full object-cover" />
      </div>
    </div>
  );
};

export default ObstSec;
