// components/SemesterCard.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { Semester } from "@/app/types/academic-paths";
import { motion } from "framer-motion";
import imagePlaceholder from "@/public/images/image-placeholder.svg";

interface SemesterCardProps {
  semester: Semester;
  isRTL: boolean;
}

export const SemesterCard = ({ semester, isRTL }: SemesterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/dashboard/semester/${semester.slug}`}>
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
          {/* Image Section */}
          <div className="relative aspect-[16/9] w-full">
            <Image
              //   src={isRTL ? semester.image_url_ar : semester.image_url_en}
              src={imagePlaceholder}
              alt={isRTL ? semester.name_ar : semester.name_en}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isRTL ? semester.name_ar : semester.name_en}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {isRTL ? semester.description_ar : semester.description_en}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>
                  {isRTL ? "الفصل" : "Semester"} {semester.order}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>5,617</span> {/* Replace with actual data if available */}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
