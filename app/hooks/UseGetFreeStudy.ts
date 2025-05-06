import { useCallback } from 'react';
import axiosInstance, { axiosPublic } from '../lib/axios/instance';
import { FreeStudyCourse } from '../types/freeStudy';
import { useQuery } from '@tanstack/react-query';

type Props = {
  slug: string;
  isPublic?: boolean;
};

const UseGetFreeStudy = ({ slug, isPublic }: Props) => {
  const fetchStudyBySlug = useCallback(async () => {
    const res = isPublic
      ? await axiosPublic.get(`free-study/slug/${slug}`)
      : await axiosInstance.get(`free-study/slug/${slug}`);
    return res.data.data as FreeStudyCourse;
  }, [slug, isPublic]);
  return useQuery({
    queryKey: ['free-study', slug],
    queryFn: fetchStudyBySlug,
  });
};

export default UseGetFreeStudy;
