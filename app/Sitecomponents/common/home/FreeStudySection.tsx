import StudyCard from "./StudyCard";

export default function FreeStudySection() {
  const studiesInfo = [
    {
      title: "Living Fittra",
      image:
        "https://efficaciousleadership.com/awaken-fittra/_next/static/media/Logo%20web.bc396bf5.png",
      url: "https://efficaciousleadership.com/awaken-fittra/",
      description:
        "برنامج أيقظ الفطرة هو برنامج تدريبي، تفاعلي، مُكثف ينقلك من حال المُتفرج إلى حال الفاعلية بأساليب مدروسة ومُتقنة، يُقدمه الأستاذ ويل ستيل تحت إشراف الدكتور/أحمد الدملاوي. برنامج تُفعل فيه الفطرة، لتستلم زمام حياتك من جديد وتكون على الطريق الصحيح، حيث الفرص والإمكانيات اللامحدودة.",
    },
    {
      title: "Emotional Literacy",
      image:
        "https://managethenow.com/emotional-literacy/_next/static/media/logo.f54f6b79.svg",
      url: "https://managethenow.com/emotional-literacy/",
      description:
        "برنامج محو الأمية الشعورية هو رحلتك لاكتشاف العالم الخفي للمشاعر وتأثيره على حياتك اليومية. دعنا نساعدك على فهم ذاتك، تحقيق التوازن، وإدارة مشاعرك بوعي لتعيش حياة أكثر سعادة وإيجابية.",
    },
    {
      title: "Luscher",
      image: "https://managethenow.com/luscher/images/logo.png",
      url: "https://managethenow.com/luscher/",
      description:
        "الطبيب الوحيد في العالم العربي الذي يعتمد في تشخيص وعلاج عملائه على منظور علاجي وتدريبي ينبع من تشخيص النفس بالألوان وتشخيص المرض بالسبب النفسي له. علم الميتاهيلث منذ عام 2012 حتى الآن.",
    },
    {
      title: "Session CT Scan",
      image:
        "https://managethenow.com/session-ct-scan//_next/static/media/Brain%20CT%20Scan%20logo.333ba614.svg",
      url: "https://managethenow.com/session-ct-scan/",
      description:
        "نحن هنا لنساعدك على كشف أسرار جسدك وعقلك باستخدام أحدث التقنيات. يقدم مركز إدارة اللحظة خدمة التشخيص باستخدام تقنية التصوير المقطعي على المخ (CT Scan)، لتحديد أي ألم جسدي أو سلوك غير مفهوم، مما يتيح لك رؤية أوضح وفهم أعمق لذاتك.",
    },
  ];

  return (
    <div className="container md:w-[80%] mx-auto mt-20">
      <div className="flex items-end justify-center md:justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-[#353535]">
          Free Study Section
        </h1>
        {/* <span className="hidden md:inline text-lg">See all</span> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
        {studiesInfo.map((study, index) => {
          return <StudyCard key={index} study={study} />;
        })}
      </div>
    </div>
  );
}
