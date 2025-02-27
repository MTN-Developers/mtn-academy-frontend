// hooks/useSemesterDetails.ts
import { useQuery } from '@tanstack/react-query';
import { SemesterDetails } from '../types/semester';
import axiosInstance from '../lib/axios/instance';

async function fetchSemester(id: string) {
  const response = await axiosInstance.get(`/semesters/${id}`);
  return response.data.data as SemesterDetails;
}

export const useSemesterDetails = (id: string) => {
  return useQuery({
    queryKey: ['semester', id],
    queryFn: () => fetchSemester(id),
    enabled: !!id && id !== '', // Only run query if id exists and is not empty
  });
};
