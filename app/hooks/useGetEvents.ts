import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import axiosInstance from '../lib/axios/instance';
import { EventDetails } from '../types/Events';

interface IProps {
  semesterId: string;
  page: number;
  limit: number;
}

const useGetEvents = ({ semesterId, page = 1, limit = 50000 }: IProps) => {
  const fetchEvents = useCallback(async () => {
    const response = await axiosInstance.get(`/events/semester/${semesterId}/?page=${page}&limit=${limit}`);
    return response.data.data.data as EventDetails[];
  }, [limit, page, semesterId]);

  return useQuery({
    queryKey: ['events', page, limit],
    queryFn: () => fetchEvents(),
  });
};

export default useGetEvents;
