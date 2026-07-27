/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1a1a1a',
    background: '#ffffff',
    backgroundElement: '#F6F5F1',
    backgroundSelected: '#ECEAF0',
    textSecondary: '#9a9a9e',
  },
  dark: {
    text: '#ffffff',
    background: '#15121F',
    backgroundElement: '#221D33',
    backgroundSelected: '#2f2942',
    textSecondary: 'rgba(255,255,255,0.5)',
  },
} as const;

export const Typography = {
  /** Fredoka display type — used for the app title and park names. */
  displayLg: { fontFamily: 'Fredoka_700Bold', fontSize: 29, lineHeight: 34 },
  titleMd: { fontFamily: 'Fredoka_600SemiBold', fontSize: 20, lineHeight: 26 },
  headlineLg: { fontFamily: 'Fredoka_700Bold', fontSize: 28, lineHeight: 36 },
  labelSm: { fontFamily: 'Inter_600SemiBold', fontSize: 12, letterSpacing: 0.6 },
  labelMd: { fontFamily: 'Inter_500Medium', fontSize: 14, lineHeight: 20 },
  bodyMd: { fontFamily: 'Inter_500Medium', fontSize: 16, lineHeight: 24 },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
