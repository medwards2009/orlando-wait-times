import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

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
 * Stack layout shared by every park group. Renders the group's child screen
 * with a header whose left arrow pops back to the park picker (`index`).
 */
export default function ParkGroupStack({ title, screenName = '(tabs)' }: ParkGroupStackProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name={screenName}
        options={{
          title,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Back to park picker"
            >
              <Ionicons name="chevron-back" size={26} color={theme.colors.onSurface} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
