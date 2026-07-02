import { ForecastItemDto } from '@/types/api';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BAR_MAX_HEIGHT = 120;
const BAR_WIDTH = 28;
const BAR_COL_WIDTH = 44;

function barColor(waitTime: number): string {
  if (waitTime < 20) return '#22c55e';
  if (waitTime < 45) return '#f59e0b';
  return '#ef4444';
}

function formatHour(isoTime: string): string {
  const match = isoTime.match(/T(\d{2}):/);
  if (!match) return '';
  const h = parseInt(match[1], 10);
  if (h === 0) return '12a';
  if (h < 12) return `${h}a`;
  if (h === 12) return '12p';
  return `${h - 12}p`;
}

interface ForecastSheetProps {
  visible: boolean;
  attractionName: string;
  forecast: ForecastItemDto[];
  onDismiss: () => void;
}

export function ForecastSheet({
  visible,
  attractionName,
  forecast,
  onDismiss,
}: ForecastSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const maxWait = Math.max(...forecast.map((f) => f.waitTime), 1);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onDismiss} />
        <View
          style={[
            styles.sheet,
            { backgroundColor: theme.colors.surface, paddingBottom: insets.bottom + 16 },
          ]}
        >
          <View style={[styles.handle, { backgroundColor: theme.colors.onSurfaceVariant }]} />

          <Text style={[styles.title, { color: theme.colors.onSurface }]} numberOfLines={2}>
            {attractionName}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Forecasted wait times today
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartContent}
          >
            {forecast.map((item) => {
              const barHeight = Math.max((item.waitTime / maxWait) * BAR_MAX_HEIGHT, 6);
              return (
                <View key={item.time} style={styles.barColumn}>
                  <View style={styles.chartArea}>
                    <Text style={[styles.waitLabel, { color: theme.colors.onSurface }]}>
                      {item.waitTime}
                    </Text>
                    <View
                      style={[
                        styles.bar,
                        { height: barHeight, backgroundColor: barColor(item.waitTime) },
                      ]}
                    />
                  </View>
                  <Text style={[styles.timeLabel, { color: theme.colors.onSurfaceVariant }]}>
                    {formatHour(item.time)}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
    opacity: 0.4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 20,
  },
  chartContent: {
    paddingBottom: 4,
  },
  barColumn: {
    width: BAR_COL_WIDTH,
    alignItems: 'center',
  },
  chartArea: {
    height: BAR_MAX_HEIGHT + 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
  waitLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: 4,
  },
  timeLabel: {
    fontSize: 11,
    marginTop: 6,
  },
});

export default ForecastSheet;
