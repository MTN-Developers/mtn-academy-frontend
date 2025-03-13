import { useCallback } from 'react';
import axiosInstance from '../lib/axios/instance';
import { Semester } from '../types/academic-paths';
import { useQuery } from '@tanstack/react-query';

const useGetSemestersProgress = () => {
  const fetchSemestersProgress = useCallback(async () => {
    const response = await axiosInstance.get('/user-semester-progress');

    return response.data.data as Semester[];
  }, []);

  return useQuery({
    queryKey: ['semesters-progress'],
    queryFn: () => fetchSemestersProgress(),
  });
};

export default useGetSemestersProgress;
