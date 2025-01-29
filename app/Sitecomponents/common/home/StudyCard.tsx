import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import personIcon from "@/public/icons/person.svg";
import loveIcon from "@/public/icons/love.svg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StudyCard({
  study,
}: {
  study: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
}) {
  return (
    <Card className="py-3 px-2">
      <div className="h-[200px] w-full overflow-hidden flex justify-center items-center">
        <Image
          alt="cardImage"
          src={study.image}
          className="w-full h-full object-contain"
          width={500}
          height={160}
        />
      </div>

      <CardHeader className="py-3 p-0">
        <Badge className="w-fit bg-[#73B8FF] text-sm font-normal rounded-2xl">
          Free study
        </Badge>
        <CardTitle className="text-2xl">{study.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-2 text-sm h-36 text-gray-500 text-ellipsis text-right break-words">
        {study.description}
      </CardContent>
      <CardFooter className="py-0 px-3 pt-6 pb-5 flex flex-col space-y-2 justify-between">
        <div className="flex items-center justify-start w-full space-x-3">
          <div className="flex items-center">
            <Image alt="peopleIcon" src={personIcon} />
            <span>5.617</span>
          </div>
          <div className="flex items-center">
            <Image alt="loveIcon" src={loveIcon} />
            <span>1650</span>
          </div>
        </div>
        <div className="w-full flex items-end justify-start">
          <Link
            href={study.url}
            className="text-primary-blue text-base font-semibold"
          >
            Read more ...
          </Link>
          {/* <span className="text-red-500 text-base">%40 Discount</span> */}
        </div>
      </CardFooter>
    </Card>
  );
}
