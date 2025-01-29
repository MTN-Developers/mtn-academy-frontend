import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "@/public/images/frame.png";
import personIcon from "@/public/icons/person.svg";
import loveIcon from "@/public/icons/love.svg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function StudyCard() {
  return (
    <Card>
      <Image alt="cardImage" src={image} className="w-full object-cover" />

      <CardHeader className="p-3">
        <Badge className="w-fit bg-[#73B8FF] text-sm font-normal rounded-2xl">
          Free study
        </Badge>
        <CardTitle className="text-2xl">Emotional literacy</CardTitle>
        <CardDescription className="text-sm text-black">
          A course by Ahmed eldmlawy
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 py-0 text-sm text-gray-500">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its
      </CardContent>
      <CardFooter className="py-0 px-3 pt-3 pb-5 flex flex-col space-y-2 justify-between">
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
        <div className="w-full flex items-end justify-between">
          <span className="text-primary-blue text-3xl font-semibold">
            $1300
          </span>
          <span className="text-red-500 text-base">%40 Discount</span>
        </div>
      </CardFooter>
    </Card>
  );
}
