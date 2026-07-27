import { useResortTheme } from '@/contexts/ResortThemeContext';
import { ForecastItemDto } from '@/types/api';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BAR_MAX_HEIGHT = 120;
const BAR_WIDTH = 20;
const BAR_COL_WIDTH = 40;

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
  const { variant } = useResortTheme();
  const insets = useSafeAreaInsets();

  const maxWait = Math.max(...forecast.map((f) => f.waitTime), 1);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onDismiss} />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: variant.cardBg,
              shadowColor: variant.tabShadow,
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          <View style={styles.handle} />

          <Text style={[styles.title, { color: variant.forecastLabel }]} numberOfLines={2}>
            {attractionName}
          </Text>
          <Text style={[styles.subtitle, { color: variant.subtitle }]}>
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
                    <Text style={[styles.waitLabel, { color: variant.forecastLabel }]}>
                      {item.waitTime}
                    </Text>
                    <View
                      style={[
                        styles.bar,
                        { height: barHeight, backgroundColor: variant.forecastBar },
                      ]}
                    />
                  </View>
                  <Text style={[styles.timeLabel, { color: variant.subtitle }]}>
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingHorizontal: 24,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 12,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 18,
    backgroundColor: '#e0dee8',
  },
  title: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 21,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13.5,
    marginBottom: 22,
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
    gap: 6,
  },
  waitLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: 999,
  },
  timeLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10.5,
    marginTop: 6,
  },
});

export default ForecastSheet;
