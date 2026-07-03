import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing, Typography } from '@/constants/theme';
import { RESORT_LIST } from '@/constants/resortThemes';

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

        {RESORT_LIST.map((resort) => (
          <Pressable
            key={resort.key}
            onPress={() => router.push(resort.href)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: resort.tint, opacity: pressed ? 0.75 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={resort.name}
          >
            <View style={[styles.avatar, { backgroundColor: resort.accent }]}>
              <Text style={styles.mono}>{resort.mono}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.cardLabel, { color: theme.colors.onSurface }]}>
                {resort.name}
              </Text>
              <Text style={[styles.cardSub, { color: theme.colors.onSurfaceVariant }]}>
                {resort.sub}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={26} color={resort.accent} />
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
    gap: Spacing.two,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  heading: {
    ...Typography.displayLg,
    marginTop: Spacing.four,
  },
  subheading: {
    ...Typography.labelMd,
    fontSize: 15,
    marginBottom: Spacing.three,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mono: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 20,
    color: '#ffffff',
  },
  cardText: {
    flex: 1,
    minWidth: 0,
  },
  cardLabel: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 17,
  },
  cardSub: {
    ...Typography.labelMd,
    fontSize: 12.5,
    marginTop: 2,
  },
});
