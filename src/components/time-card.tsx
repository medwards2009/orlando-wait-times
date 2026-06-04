import { QueueDto } from '@/types/api';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';

interface TimeCardProps {
  id: string;
  name: string;
  queue?: QueueDto;
  status?: string;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function TimeCard({
  id,
  name,
  queue,
  status,
  isFavorited = false,
  onFavoriteToggle,
}: TimeCardProps) {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const waitTime = queue?.STANDBY?.waitTime ?? null;
  const isOperating = status === 'OPERATING';

  let borderColor = theme.colors.onSurfaceVariant;
  if (isOperating && waitTime !== null) {
    if (waitTime < 20) borderColor = '#22c55e';
    else if (waitTime < 45) borderColor = '#f59e0b';
    else borderColor = '#ef4444';
  }

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.dark ? theme.colors.surface : theme.colors.background,
          borderLeftColor: borderColor,
          borderLeftWidth: 4,
        },
        isPressed && styles.cardPressed,
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.rideName, { color: theme.colors.onSurface }]} numberOfLines={2}>
            {name}
          </Text>
        </View>

        <View style={styles.waitTimeContainer}>
          <Text
            style={[
              isOperating && waitTime !== null ? styles.waitTime : styles.closedText,
              {
                color:
                  isOperating && waitTime !== null
                    ? theme.colors.onSurface
                    : theme.colors.onSurfaceVariant,
              },
            ]}
          >
            {isOperating && waitTime !== null ? `${waitTime}` : 'Closed'}
          </Text>
          <Text style={[styles.minutesLabel, { color: theme.colors.onSurfaceVariant }]}>
            {isOperating && waitTime !== null ? 'MIN' : ''}
          </Text>
        </View>

        {onFavoriteToggle && (
          <IconButton
            icon={isFavorited ? 'star' : 'star-outline'}
            size={24}
            onPress={() => onFavoriteToggle(id)}
            style={styles.favoriteButton}
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cardPressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  rideName: {
    fontSize: 16,
    fontWeight: '600',
  },
  waitTimeContainer: {
    alignItems: 'center',
    minWidth: 50,
  },
  waitTime: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  closedText: {
    fontSize: 14,
    fontWeight: '500',
  },
  minutesLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteButton: {
    margin: 0,
  },
});

export default TimeCard;
