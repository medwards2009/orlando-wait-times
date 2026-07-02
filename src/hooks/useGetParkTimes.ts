import { DestinationDto, LiveDto } from '@/types/api';
import { apiClient } from '@/utils/apiClient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface UseGetParkTimesOptions {
  destinationSlug: string;
  parkName: string;
  enabled?: boolean;
  refetchInterval?: number;
}

export function useGetParkTimes({
  destinationSlug,
  parkName,
  enabled = true,
  refetchInterval = 30000,
}: UseGetParkTimesOptions) {
  const [isFocused, setIsFocused] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, []),
  );

  const { data: destinations } = useQuery<DestinationDto[], Error>({
    queryKey: ['destinations'],
    queryFn: () => apiClient.getDestinations(),
    staleTime: 60 * 60 * 1000,
  });

  const destination = destinations?.find((d) => d.slug === destinationSlug);
  const parkId = destination?.parks.find((p) =>
    p.name.toLowerCase().includes(parkName.toLowerCase()),
  )?.id;

  return useQuery<LiveDto, Error>({
    queryKey: ['parkTimes', parkId],
    queryFn: () => apiClient.getLiveData(parkId!),
    enabled: enabled && !!parkId,
    refetchInterval: isFocused ? refetchInterval : false,
    staleTime: 10000,
    retry: 2,
  });
}

export default useGetParkTimes;
