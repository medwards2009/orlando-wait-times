import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing, Typography } from '@/constants/theme';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const PARKS: { label: string; href: Href; icon: IconName }[] = [
  { label: 'Walt Disney World', href: '/(disney)/(tabs)/magic-kingdom', icon: 'castle' },
  {
    label: 'Universal Orlando Resort',
    href: '/(universal)/(tabs)/islands-of-adventure',
    icon: 'movie-star',
  },
  { label: 'SeaWorld Orlando', href: '/(seaworld)/(tabs)/seaworld-orlando', icon: 'waves' },
  { label: 'LEGOLAND Florida', href: '/(legoland)', icon: 'toy-brick' },
];

export default function ParkPickerScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.heading, { color: theme.colors.onBackground }]}>
          Orlando Wait Times
        </Text>
        <Text style={[styles.subheading, { color: theme.colors.onSurfaceVariant }]}>
          Choose a park
        </Text>

        {PARKS.map((park) => (
          <Pressable
            key={park.label}
            onPress={() => router.push(park.href)}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: theme.colors.elevation.level1,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={park.label}
          >
            <MaterialCommunityIcons
              name={park.icon}
              size={28}
              color={theme.colors.primary}
              style={styles.cardIcon}
            />
            <Text style={[styles.cardLabel, { color: theme.colors.onSurface }]}>{park.label}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  heading: {
    ...Typography.headlineLg,
    marginTop: Spacing.four,
  },
  subheading: {
    ...Typography.labelMd,
    marginBottom: Spacing.two,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
  },
  cardIcon: {
    marginRight: Spacing.three,
  },
  cardLabel: {
    ...Typography.bodyMd,
    flex: 1,
  },
});
