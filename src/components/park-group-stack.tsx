import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useResortTheme } from '@/contexts/ResortThemeContext';

interface ParkGroupStackProps {
  title: string;
  /**
   * The child route this group's Stack renders. Defaults to the `(tabs)` group
   * for multi-park resorts; single-park resorts (e.g. LEGOLAND) pass `index` to
   * render their park screen directly with no tab bar.
   */
  screenName?: string;
}

/**
 * Custom header for a park group. Fully replaces the native stack header so the
 * only back affordance is our styled chip — this avoids the native back button
 * (surfaced from the parent stack) rendering underneath it.
 */
function ParkGroupHeader({ title }: { title: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, variant } = useResortTheme();

  return (
    <View style={{ backgroundColor: variant.screenBg, paddingTop: insets.top }}>
      <View style={styles.row}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Back to park picker"
        >
          <View style={[styles.backChip, { backgroundColor: variant.backChip }]}>
            <Ionicons name="chevron-back" size={20} color={theme.accent} />
          </View>
        </Pressable>

        <Text style={[styles.title, { color: variant.title }]} numberOfLines={1}>
          {title}
        </Text>

        {/* Spacer matching the chip width so the title stays centered. */}
        <View style={styles.backChip} />
      </View>
    </View>
  );
}

/**
 * Stack layout shared by every park group. Washes the header in the active
 * resort's color and renders a single styled back arrow that pops to the picker.
 */
export default function ParkGroupStack({ title, screenName = '(tabs)' }: ParkGroupStackProps) {
  return (
    <Stack>
      <Stack.Screen
        name={screenName}
        options={{
          header: () => <ParkGroupHeader title={title} />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 12,
  },
  backChip: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Fredoka_700Bold',
    fontSize: 18,
    marginHorizontal: 8,
  },
});
