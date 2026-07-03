import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Colors } from './theme';

/**
 * React Native Paper theme configuration extending the app's color system
 */

export const PaperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#7C6AE8', // Vivid Resort Worlds default accent (purple)
    secondary: '#0EA5A0', // Teal
    tertiary: '#FF7A45', // Orange
    background: Colors.light.background,
    onBackground: Colors.light.text,
    error: '#ef4444',
    errorContainer: '#fecaca',
    surface: '#ffffff',
    surfaceVariant: Colors.light.backgroundSelected,
    onSurface: Colors.light.text,
    onSurfaceVariant: Colors.light.textSecondary,
  },
};

export const PaperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#9E90F5',
    secondary: '#5FD6D0',
    tertiary: '#FFA579',
    background: Colors.dark.background,
    onBackground: Colors.dark.text,
    error: '#f87171',
    errorContainer: '#7f1d1d',
    surface: Colors.dark.backgroundElement,
    surfaceVariant: Colors.dark.backgroundSelected,
    onSurface: Colors.dark.text,
    onSurfaceVariant: Colors.dark.textSecondary,
  },
};

export type PaperTheme = typeof PaperLightTheme;
