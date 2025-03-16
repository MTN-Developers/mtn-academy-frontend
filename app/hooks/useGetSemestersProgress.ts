import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../lib/axios/instance';
import { useQuery } from '@tanstack/react-query';
import { UserSemester } from '../types/semester';

const useGetSemestersProgress = () => {
  const [semesters, setSemesters] = useState<UserSemester[]>();
  const fetchSemestersProgress = useCallback(async () => {
    const response = await axiosInstance.get('/user-semester-progress');

    return response.data.data as UserSemester[];
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['semesters-progress'],
    queryFn: () => fetchSemestersProgress(),
  });

  // ✅ Use useEffect to update state when data changes
  useEffect(() => {
    if (data) {
      setSemesters(data);
    }
  }, [data]);

  return { semesters, isLoading, error };
};

export default useGetSemestersProgress;
