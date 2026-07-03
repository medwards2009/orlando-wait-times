import { useResortTheme } from '@/contexts/ResortThemeContext';
import { waitLevel } from '@/constants/resortThemes';
import { ForecastItemDto, QueueDto } from '@/types/api';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
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
  const { variant, theme: resort } = useResortTheme();
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

  // Single-hue badge: standby time picks a level; open states use the low shade;
  // closed uses the neutral shade.
  let badge = variant.closed;
  let badgeText = 'Closed';
  if (hasStandbyTime) {
    badge = variant.wait[waitLevel(waitTime!)];
    badgeText = `${waitTime} MIN`;
  } else if (operatingLabel) {
    badge = variant.wait[0];
    badgeText = operatingLabel;
  }

  return (
    <>
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: variant.cardBg,
            shadowColor: variant.cardShadow,
          },
          isPressed && styles.cardPressed,
        ]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={hasForecast ? () => setShowForecast(true) : undefined}
      >
        <View style={styles.content}>
          <Text style={[styles.rideName, { color: theme.colors.onSurface }]} numberOfLines={2}>
            {name}
          </Text>

          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.fg }]}>{badgeText.toUpperCase()}</Text>
          </View>

          {onFavoriteToggle && (
            <IconButton
              icon={isFavorited ? 'star' : 'star-outline'}
              size={20}
              iconColor={isFavorited ? resort.accent : variant.subtitle}
              onPress={() => onFavoriteToggle(id)}
              style={styles.favoriteButton}
            />
          )}
        </View>
      </Pressable>

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
    marginBottom: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rideName: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15.5,
  },
  badge: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  favoriteButton: {
    margin: 0,
    marginRight: -8,
  },
});

export default TimeCard;
