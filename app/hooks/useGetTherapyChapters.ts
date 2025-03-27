// app/hooks/useGetTherapyChapters.ts
import { useCallback } from 'react';
import axiosInstance from '../lib/axios/instance';
import { PracticalExDetailsResponse } from '../types/practicalEx';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  courseId: string;
}

const useGetTherapyChapters = ({ courseId }: IProps) => {
  const fetchTherapyChapters = useCallback(async () => {
    const response = await axiosInstance.get(`chapter/course/${courseId}?chapterType=therapy_gym`);
    return response.data as PracticalExDetailsResponse;
  }, [courseId]);

  return useQuery({
    queryKey: ['practicalEx', courseId],
    queryFn: fetchTherapyChapters,
    select: data => data.data, // Extract the data array from the response
  });
};

export default useGetTherapyChapters;
