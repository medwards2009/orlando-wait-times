import { Typography } from '@/constants/theme';
import { useResortTheme } from '@/contexts/ResortThemeContext';
import { LiveDataItemDto } from '@/types/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import TimeCard from './time-card';

interface TimesListProps {
  attractions: LiveDataItemDto[];
  parkName?: string;
  isFetching?: boolean;
  onRefresh?: () => void;
  onFavoriteToggle?: (id: string) => void;
  favoritedIds?: Set<string>;
}

type ListItem =
  | { type: 'section'; label: string; count?: number; key: string }
  | { type: 'attraction'; data: LiveDataItemDto; key: string };

export function TimesList({
  attractions,
  parkName,
  isFetching = false,
  onRefresh,
  onFavoriteToggle,
  favoritedIds = new Set(),
}: TimesListProps) {
  const { variant } = useResortTheme();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh?.();
  }, [onRefresh]);

  useEffect(() => {
    if (!isFetching) setRefreshing(false);
  }, [isFetching]);

  const listItems = useMemo<ListItem[]>(() => {
    const pinned = attractions.filter((a) => favoritedIds.has(a.id));
    const rest = attractions.filter((a) => !favoritedIds.has(a.id));
    const items: ListItem[] = [];

    if (pinned.length > 0) {
      items.push({
        type: 'section',
        label: 'Pinned Favorites',
        count: pinned.length,
        key: 'section-pinned',
      });
      pinned.forEach((a) => items.push({ type: 'attraction', data: a, key: `pinned-${a.id}` }));
    }

    if (rest.length > 0) {
      items.push({
        type: 'section',
        label: parkName ?? 'All Rides',
        count: rest.length + pinned.length,
        key: 'section-all',
      });
      rest.forEach((a) => items.push({ type: 'attraction', data: a, key: `ride-${a.id}` }));
    }

    return items;
  }, [attractions, favoritedIds]);

  const renderItem: ListRenderItem<ListItem> = ({ item }) => {
    if (item.type === 'section') {
      return (
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionLabel, { color: variant.sectionLabel }]}>
            {item.label.toUpperCase()}
          </Text>
          {item.count != null && (
            <Text style={[styles.sectionCount, { color: variant.subtitle }]}>
              {item.count} ATTRACTIONS
            </Text>
          )}
        </View>
      );
    }
    return (
      <TimeCard
        id={item.data.id}
        name={item.data.name}
        queue={item.data.queue}
        status={item.data.status}
        forecast={item.data.forecast}
        isFavorited={favoritedIds.has(item.data.id)}
        onFavoriteToggle={onFavoriteToggle}
      />
    );
  };

  if (isFetching && attractions.length === 0) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: variant.screenBg }]}>
        <ActivityIndicator size="large" color={variant.forecastBar} />
        <Text style={[styles.loadingText, { color: variant.subtitle }]}>Loading wait times…</Text>
      </View>
    );
  }

  if (!isFetching && attractions.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: variant.screenBg }]}>
        <Text style={[styles.emptyText, { color: variant.subtitle }]}>
          No attractions available
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={listItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.listContent}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={variant.forecastBar}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  sectionLabel: {
    ...Typography.labelSm,
  },
  sectionCount: {
    ...Typography.labelSm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

export default TimesList;
