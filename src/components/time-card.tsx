import { ForecastItemDto, QueueDto } from '@/types/api';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { ForecastSheet } from './forecast-sheet';

interface TimeCardProps {
  id: string;
  name: string;
  queue?: QueueDto;
  status?: string;
  forecast?: ForecastItemDto[];
  isFavorited?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function TimeCard({
  id,
  name,
  queue,
  status,
  forecast,
  isFavorited = false,
  onFavoriteToggle,
}: TimeCardProps) {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [showForecast, setShowForecast] = useState(false);

  const hasForecast = !!forecast?.length;

  const waitTime = queue?.STANDBY?.waitTime ?? null;
  const isOperating = status === 'OPERATING';
  const hasStandbyTime = isOperating && waitTime !== null;

  let operatingLabel: string | null = null;
  if (isOperating && waitTime === null) {
    if (queue?.BOARDING_GROUP) operatingLabel = 'Virtual';
    else if (queue?.RETURN_TIME || queue?.PAID_RETURN_TIME) operatingLabel = 'LL';
    else operatingLabel = 'Open';
  }

  let borderColor = theme.colors.onSurfaceVariant;
  if (isOperating) {
    if (hasStandbyTime) {
      if (waitTime! < 20) borderColor = '#22c55e';
      else if (waitTime! < 45) borderColor = '#f59e0b';
      else borderColor = '#ef4444';
    } else {
      borderColor = '#22c55e';
    }
  }

  return (
    <>
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
        onPress={hasForecast ? () => setShowForecast(true) : undefined}
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
                hasStandbyTime ? styles.waitTime : styles.closedText,
                { color: isOperating ? theme.colors.onSurface : theme.colors.onSurfaceVariant },
              ]}
            >
              {hasStandbyTime ? `${waitTime}` : (operatingLabel ?? 'Closed')}
            </Text>
            <Text style={[styles.minutesLabel, { color: theme.colors.onSurfaceVariant }]}>
              {hasStandbyTime ? 'MIN' : ''}
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

      {hasForecast && (
        <ForecastSheet
          visible={showForecast}
          attractionName={name}
          forecast={forecast!}
          onDismiss={() => setShowForecast(false)}
        />
      )}
    </>
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
