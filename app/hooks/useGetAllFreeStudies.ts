'use client';

import { useCallback } from 'react';
import axiosInstance, { axiosPublic } from '../lib/axios/instance';
import { FreeStudiesResponse } from '../types/freeStudy';
import { useQuery } from '@tanstack/react-query';

type Props = {
  slug?: string;
  limit?: number;
  page?: number;
  isPublic?: boolean;
};

const useGetAllFreeStudies = ({ slug, limit = 2, page = 1, isPublic = false }: Props) => {
  const fetchAllFreeStudies = useCallback(async () => {
    const baseUrl = '/free-study';
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });

    const response = isPublic
      ? await axiosPublic.get(`${baseUrl}${slug ? `/slug/${slug}` : `?${params.toString()}`}`, {})
      : await axiosInstance.get(`${baseUrl}${slug ? `/slug/${slug}` : `?${params.toString()}`}`);

    // console.log('res public', response);

    return response.data as FreeStudiesResponse;
  }, [slug, limit, page, isPublic]);

  return useQuery({
    queryKey: ['free-studies', slug, limit, page],
    queryFn: fetchAllFreeStudies,
  });
};

export default useGetAllFreeStudies;
