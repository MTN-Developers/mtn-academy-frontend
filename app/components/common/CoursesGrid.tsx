// components/common/CoursesGrid.tsx
import { Course } from '@/app/types/semester';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface CoursesGridProps {
  courses: Course[];
  isRTL: boolean;
}

export const CoursesGrid = ({ courses, isRTL }: CoursesGridProps) => {
  const params = useParams();
  const locale = params.locale as string;

  if (!courses?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{isRTL ? 'لا توجد دورات متاحة' : 'No courses available'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <Link key={course.id} href={`/${locale}/dashboard/course/${course.slug}`}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative aspect-video">
              <Image
                src={isRTL ? course.logo_ar : course.logo_en}
                alt={isRTL ? course.name_ar : course.name_en}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="w-fit px-4 py-1 text-center rounded-3xl bg-[#73b8ff] text-[11px] mb-3 text-white">
                MTN study
              </div>
              <h3 className="font-semibold mb-2">{isRTL ? course.name_ar : course.name_en}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {isRTL ? course.description_ar : course.description_en}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
