import { useCallback } from 'react';
import axiosInstance from '../lib/axios/instance';
import { useQuery } from '@tanstack/react-query';
import { QuestionData } from '../types/assigment';

interface IProps {
  videoId: string;
}

const useGetAssigmentWithAnswers = ({ videoId }: IProps) => {
  const fetchAssigmentWithAnswers = useCallback(async () => {
    const response = await axiosInstance.get(`/video-assignment/question/video/${videoId}/me`);
    return response.data.data as QuestionData[];
  }, [videoId]);

  return useQuery({
    queryKey: ['assigmentWithAnswers', videoId],
    queryFn: () => fetchAssigmentWithAnswers(),
  });
};

export default useGetAssigmentWithAnswers;
