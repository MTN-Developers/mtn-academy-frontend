import { useEffect, useState } from 'react';
import StudyCard from './StudyCard';
import axios from 'axios';

export default function FreeStudySection() {
  const [semesters, setSemeters] = useState([]);
  useEffect(() => {
    const fetchPublicSemesters = async () => {
      const response = await axios('https://api.academy.mtninstitute.net/api/semesters');

      console.log('global semesters ', semesters);

      setSemeters(response.data.data.data);

      return response;
    };

    fetchPublicSemesters();
  }, [semesters]);

  // const studiesInfo = [
  //   {
  //     title: 'ايقظ الفطرة',
  //     image: 'https://efficaciousleadership.com/awaken-fittra/_next/static/media/Logo%20web.bc396bf5.png',
  //     url: 'https://forms.mtninstitute.net/awaken-fittra-dubai',
  //     description:
  //       'برنامج أيقظ الفطرة هو برنامج تدريبي، تفاعلي، مُكثف ينقلك من حال المُتفرج إلى حال الفاعلية بأساليب مدروسة ومُتقنة، يُقدمه الأستاذ ويل ستيل تحت إشراف الدكتور/أحمد الدملاوي. برنامج تُفعل فيه الفطرة، لتستلم زمام حياتك من جديد وتكون على الطريق الصحيح، حيث الفرص والإمكانيات اللامحدودة.',
  //   },
  //   {
  //     title: 'محو الامية الشعورية',
  //     image: 'https://managethenow.com/emotional-literacy/_next/static/media/logo.f54f6b79.svg',
  //     url: 'https://forms.mtninstitute.net/ebt',
  //     description:
  //       'برنامج محو الأمية الشعورية هو رحلتك لاكتشاف العالم الخفي للمشاعر وتأثيره على حياتك اليومية. دعنا نساعدك على فهم ذاتك، تحقيق التوازن، وإدارة مشاعرك بوعي لتعيش حياة أكثر سعادة وإيجابية.',
  //   },
  //   {
  //     title: 'ممارس اختبار لوشر التشخيصي بالالوان',
  //     image: 'https://managethenow.com/luscher/images/logo.png',
  //     url: 'https://forms.mtninstitute.net/luscher',
  //     description:
  //       'الطبيب الوحيد في العالم العربي الذي يعتمد في تشخيص وعلاج عملائه على منظور علاجي وتدريبي ينبع من تشخيص النفس بالألوان وتشخيص المرض بالسبب النفسي له. علم الميتاهيلث منذ عام 2012 حتى الآن.',
  //   },
  //   {
  //     title: 'منطقية الشعور',
  //     image: 'https://s3.amazonaws.com/dynamic.form/uploads/1735733175937-logical-feeling.png',
  //     url: 'https://forms.mtninstitute.net/logical-feeling',
  //     description:
  //       'نحن هنا لنساعدك على كشف أسرار جسدك وعقلك باستخدام أحدث التقنيات. يقدم مركز إدارة اللحظة خدمة التشخيص باستخدام تقنية التصوير المقطعي على المخ (CT Scan)، لتحديد أي ألم جسدي أو سلوك غير مفهوم، مما يتيح لك رؤية أوضح وفهم أعمق لذاتك.',
  //   },
  // ];

  return (
    <div className="container md:w-[80%] mx-auto mt-20">
      <div className="flex items-end justify-center md:justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-[#353535]">Free Study Section</h1>
        {/* <span className="hidden md:inline text-lg">See all</span> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
        {semesters.length > 0 &&
          semesters.map((study, index) => {
            return <StudyCard key={index} study={study} />;
          })}
      </div>
    </div>
  );
}
