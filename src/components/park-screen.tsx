import TimesList from '@/components/times-list';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useGetParkTimes } from '@/hooks/useGetParkTimes';
import { LiveDataItemDto } from '@/types/api';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ParkScreenProps {
  destinationSlug: string;
  parkName: string;
}

export function ParkScreen({ destinationSlug, parkName }: ParkScreenProps) {
  const theme = useTheme();
  const { favoritedIds, toggleFavorite } = useFavorites();

  const { data, isFetching, error, refetch } = useGetParkTimes({
    destinationSlug,
    parkName,
    refetchInterval: 30000,
  });

  const attractions = useMemo<LiveDataItemDto[]>(() => {
    if (!data) return [];
    return data.liveData.filter((item) => item.entityType === 'ATTRACTION');
  }, [data]);

  if (error) {
    return (
      <SafeAreaView
        edges={['top']}
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          Error loading wait times: {error.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TimesList
        attractions={attractions}
        parkName={parkName}
        isFetching={isFetching}
        onRefresh={refetch}
        favoritedIds={favoritedIds}
        onFavoriteToggle={toggleFavorite}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    padding: 16,
    textAlign: 'center',
  },
});

export default ParkScreen;
