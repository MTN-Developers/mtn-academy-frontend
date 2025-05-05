import { useCallback } from 'react';
import axiosInstance from '../lib/axios/instance';
import { FreeStudyCourse } from '../types/freeStudy';
import { useQuery } from '@tanstack/react-query';

type Props = {
  slug: string;
};

const UseGetFreeStudy = ({ slug }: Props) => {
  const fetchStudyBySlug = useCallback(async () => {
    const res = await axiosInstance.get(`free-study/slug/${slug}`);
    return res.data.data as FreeStudyCourse;
  }, [slug]);
  return useQuery({
    queryKey: ['free-study', slug],
    queryFn: fetchStudyBySlug,
  });
};

export default UseGetFreeStudy;
