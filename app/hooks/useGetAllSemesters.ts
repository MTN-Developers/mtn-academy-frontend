import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/instance';
import { SemesterDetails } from '../types/semester';

async function fetchSemesters() {
  const response = await axiosInstance.get('/semesters');
  return response.data.data.data as SemesterDetails[];
}

const useGetAllSemesters = () => {
  return useQuery({
    queryKey: ['semesters'],
    queryFn: () => fetchSemesters(),
  });
};

export default useGetAllSemesters;
