import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

/**
 * Shared NativeTabs styling used by every park group's tab layout.
 * Unselected icons use the text color; selected icon defaults to system blue.
 * Labels stay the text color in both states (no blue highlight on selection).
 */
export function useTabBarProps() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme as keyof typeof Colors];

  return {
    iconColor: { default: colors.text },
    labelStyle: {
      normal: { color: colors.text, fontSize: 10 },
      selected: { color: colors.text, fontSize: 10 },
    },
  };
}
