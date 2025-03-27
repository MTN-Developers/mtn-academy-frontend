// app/hooks/useGetPracticalEx.ts
import { useCallback } from 'react';
import axiosInstance from '../lib/axios/instance';
import { PracticalExDetailsResponse } from '../types/practicalEx';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  courseId: string;
}

const useGetPracticalEx = ({ courseId }: IProps) => {
  const fetchPracticalEx = useCallback(async () => {
    const response = await axiosInstance.get(`chapter/course/${courseId}?chapterType=scientific_training`);
    return response.data as PracticalExDetailsResponse;
  }, [courseId]);

  return useQuery({
    queryKey: ['practicalEx', courseId],
    queryFn: fetchPracticalEx,
    select: data => data.data, // Extract the data array from the response
  });
};

export default useGetPracticalEx;
