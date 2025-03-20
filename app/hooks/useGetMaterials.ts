import { useCallback } from 'react';
import axiosInstance from '../lib/axios/instance';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  courseId: string;
}

const useGetMaterials = ({ courseId }: IProps) => {
  const fetchMaterials = useCallback(async () => {
    const response = await axiosInstance.get(`/course-material/course/${courseId}`);

    return response.data as MaterialsResponse;
  }, [courseId]);

  return useQuery({
    queryKey: ['materials', courseId],
    queryFn: () => fetchMaterials(),
  });
};

export default useGetMaterials;
