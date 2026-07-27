import TimesList from '@/components/times-list';
import { useResortTheme } from '@/contexts/ResortThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useGetParkTimes } from '@/hooks/useGetParkTimes';
import { LiveDataItemDto } from '@/types/api';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface ParkScreenProps {
  destinationSlug: string;
  parkName: string;
}

export function ParkScreen({ destinationSlug, parkName }: ParkScreenProps) {
  const { variant } = useResortTheme();
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
      <View style={[styles.container, { backgroundColor: variant.screenBg }]}>
        <Text style={[styles.errorText, { color: '#ef4444' }]}>
          Error loading wait times: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: variant.screenBg }]}>
      <TimesList
        attractions={attractions}
        parkName={parkName}
        isFetching={isFetching}
        onRefresh={refetch}
        favoritedIds={favoritedIds}
        onFavoriteToggle={toggleFavorite}
      />
    </View>
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
