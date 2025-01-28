import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface DiplomaCardProps {
  path: {
    id: string;
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    image_url_ar: string;
    image_url_en: string;
    price: number;
    price_after_discount: number;
    languages: string[];
  };
  direction: "ltr" | "rtl";
}

export default function DiplomaCard({ path, direction }: DiplomaCardProps) {
  const isRTL = direction === "rtl";
  const t = useTranslations("diplomaCarousel");

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex justify-center mb-6 flex-shrink-0">
        <Image
          src={isRTL ? path.image_url_ar : path.image_url_en}
          alt={isRTL ? path.name_ar : path.name_en}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      <h3 className="text-xl text-[#10458c] font-bold text-center mb-6 flex-shrink-0">
        {isRTL ? path.name_ar : path.name_en}
      </h3>

      <div className="space-y-3 flex-grow">
        <div className="flex items-start gap-2">
          <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-1" />
          <span className="text-sm text-gray-700">
            {isRTL ? path.description_ar : path.description_en}
          </span>
        </div>
        {path.languages?.map((language, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-700">{language}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 flex-shrink-0">
        {path.price_after_discount ? (
          <div className="text-center mb-4">
            <span className="text-gray-400 line-through mr-2">
              ${path.price}
            </span>
            <span className="text-blue-600 font-bold">
              ${path.price_after_discount}
            </span>
          </div>
        ) : (
          <div className="text-center mb-4">
            <span className="text-blue-600 font-bold">${path.price}</span>
          </div>
        )}

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          {t("card.enrollNow")}
        </Button>
        <Link href={`/academic-paths/${path.id}`} className="block">
          <Button
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            {t("card.showMore")}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
