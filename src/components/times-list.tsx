import { LiveDataItemDto } from '@/types/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import TimeCard from './time-card';

interface TimesListProps {
  attractions: LiveDataItemDto[];
  isFetching?: boolean;
  onRefresh?: () => void;
  onFavoriteToggle?: (id: string) => void;
  favoritedIds?: Set<string>;
}

type ListItem =
  | { type: 'section'; label: string; key: string }
  | { type: 'attraction'; data: LiveDataItemDto; key: string };

export function TimesList({
  attractions,
  isFetching = false,
  onRefresh,
  onFavoriteToggle,
  favoritedIds = new Set(),
}: TimesListProps) {
  const theme = useTheme();
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
      items.push({ type: 'section', label: '★  Pinned Favorites', key: 'section-pinned' });
      pinned.forEach((a) => items.push({ type: 'attraction', data: a, key: `pinned-${a.id}` }));
    }

    if (rest.length > 0) {
      items.push({
        type: 'section',
        label: `${rest.length + pinned.length} TOTAL`,
        key: 'section-all',
      });
      rest.forEach((a) => items.push({ type: 'attraction', data: a, key: `ride-${a.id}` }));
    }

    return items;
  }, [attractions, favoritedIds]);

  const renderItem: ListRenderItem<ListItem> = ({ item }) => {
    if (item.type === 'section') {
      return (
        <View style={[styles.sectionHeader, { borderBottomColor: theme.colors.surfaceVariant }]}>
          <Text style={[styles.sectionText, { color: theme.colors.onSurface }]}>{item.label}</Text>
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
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
        <Text style={[styles.loadingText, { color: theme.colors.onSurfaceVariant }]}>
          Loading wait times…
        </Text>
      </View>
    );
  }

  if (!isFetching && attractions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
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
          tintColor={theme.colors.primary}
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
    paddingVertical: 10,
    marginBottom: 8,
    marginTop: 4,
    borderBottomWidth: 1,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
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
