import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import personIcon from "@/public/icons/person.svg";
// import loveIcon from "@/public/icons/love.svg";
import Image from 'next/image';
// import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StudyCard({
  study,
}: {
  study: {
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    image_url_en: string;
    url: string;
  };
}) {
  const params = useParams();
  const locale = params.locale as string;
  return (
    <Card className="py-3 px-2 flex flex-col justify-between ">
      <div className="h-[200px] w-[100px] mx-auto overflow-hidden flex justify-center items-center">
        <Image
          alt="cardImage"
          src={study.image_url_en}
          className="w-full h-full object-contain"
          width={500}
          height={160}
        />
      </div>

      <CardHeader className="py-3 p-0">
        <div className="w-full h-[1px] bg-gray-200 my-4"></div>
        {/* <Badge className="w-fit bg-[#73B8FF] text-sm font-normal rounded-2xl">
          Free study
        </Badge> */}
        <CardTitle className="text-xl text-center">{locale === 'en' ? study.name_en : study.name_ar}</CardTitle>
      </CardHeader>
      <CardContent className="px-3  text-sm text-gray-500 text-ellipsis text-center break-words">
        {locale === 'en' ? study.description_en.slice(0, 150) : study.description_ar.slice(0, 150)}
      </CardContent>
      <CardFooter className="py-0  px-3 pt-6 pb-5 flex flex-col space-y-2 justify-between w-full">
        {/* <div className="flex items-center justify-start w-full space-x-3">
          <div className="flex items-center">
            <Image alt="peopleIcon" src={personIcon} />
            <span>5.617</span>
          </div>
          <div className="flex items-center">
            <Image alt="loveIcon" src={loveIcon} />
            <span>1650</span>
          </div>
        </div> */}
        <div className="w-full flex items-end justify-start">
          {/* <Link
            href={study.url}
            className="text-white bg-[#017AFD] py-3 rounded-lg  w-full text-center text-base font-semibold"
          >
            سجل الان
          </Link> */}
          <Link
            href={'/login'}
            className="text-white bg-[#017AFD] py-3 rounded-lg  w-full text-center text-base font-semibold"
          >
            {locale === 'en' ? 'Start Now' : 'سجل الآن'}
          </Link>
          {/* <span className="text-red-500 text-base">%40 Discount</span> */}
        </div>
      </CardFooter>
    </Card>
  );
}
