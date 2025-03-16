// hooks/useSemesterDetails.ts
import { useQuery } from '@tanstack/react-query';
import { SemesterDetails } from '../types/semester';
import axiosInstance from '../lib/axios/instance';

async function fetchSemester(slug: string) {
  const response = await axiosInstance.get(`/semesters/${slug}`);
  return response.data.data as SemesterDetails;
}

export const useSemesterDetails = (slug: string) => {
  return useQuery({
    queryKey: ['semester', slug],
    queryFn: () => fetchSemester(slug),
    enabled: !!slug && slug !== '', // Only run query if id exists and is not empty
  });
};
