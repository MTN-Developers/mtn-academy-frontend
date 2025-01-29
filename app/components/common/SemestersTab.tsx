// components/SemestersTab.tsx

import { Semester } from "@/app/types/academic-paths";
import { SemesterCard } from "./SemesterCard";

interface SemestersTabProps {
    semesters: Semester[];
    isRTL: boolean;
  }
  
  export const SemestersTab = ({ semesters, isRTL }: SemestersTabProps) => {
    if (!semesters?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {isRTL ? "لا توجد فصول دراسية متاحة" : "No semesters available"}
          </p>
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {semesters
          .sort((a, b) => a.order - b.order)
          .map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              isRTL={isRTL}
            />
          ))}
      </div>
    );
  };
  
