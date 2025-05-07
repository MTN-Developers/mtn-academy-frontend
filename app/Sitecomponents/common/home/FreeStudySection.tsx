'use client';
import { useEffect, useState } from 'react';
import StudyCard from './StudyCard';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Semester {
  description_ar: string;
  description_en: string;
  image_url_en: string;
  name_ar: string;
  name_en: string;
}

export default function FreeStudySection() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const locale = params.locale;

  useEffect(() => {
    const fetchPublicSemesters = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.academy.mtninstitute.net/api/semesters', {
          headers: {
            'Cache-Control': 'max-age=300', // Cache for 5 minutes
          },
        });

        setSemesters(response.data.data.data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching semesters:', err);
        setError(
          err.response?.status === 429
            ? 'Too many requests. Please try again later.'
            : 'Failed to load courses. Please try again.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSemesters();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="container md:w-[80%] mx-auto mt-20">
      <div className="flex items-end justify-center md:justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-[#353535]">{locale === 'ar' ? 'دراسات' : 'Studies'}</h1>
        {/* <span className="hidden md:inline text-lg">See all</span> */}
      </div>

      {error && <div className="text-red-500 text-center my-4 p-4 bg-red-50 rounded">{error}</div>}

      {loading ? (
        <div className="text-center my-8">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
          {semesters.length > 0 ? (
            semesters.map((study, index) => (
              <StudyCard
                key={index}
                description_ar={study.description_ar}
                description_en={study.description_en}
                image_url_en={study.image_url_en}
                name_ar={study.name_ar}
                name_en={study.name_en}
                routingUrl="/login"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">No courses available at the moment.</div>
          )}
        </div>
      )}
    </div>
  );
}
