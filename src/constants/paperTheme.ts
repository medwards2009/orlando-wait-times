import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Colors } from './theme';

/**
 * React Native Paper theme configuration extending the app's color system
 */

export const PaperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563eb', // Blue
    secondary: '#f59e0b', // Amber
    tertiary: '#10b981', // Emerald
    background: Colors.light.background,
    error: '#ef4444',
    errorContainer: '#fecaca',
    surface: Colors.light.backgroundElement,
    surfaceVariant: Colors.light.backgroundSelected,
    onSurface: Colors.light.text,
    onSurfaceVariant: Colors.light.textSecondary,
  },
};

export const PaperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#98cbff',
    secondary: '#a8c9f3',
    tertiary: '#68d3ff',
    background: Colors.dark.background,
    error: '#f87171',
    errorContainer: '#7f1d1d',
    surface: Colors.dark.backgroundElement,
    surfaceVariant: Colors.dark.backgroundSelected,
    onSurface: Colors.dark.text,
    onSurfaceVariant: Colors.dark.textSecondary,
  },
};

export type PaperTheme = typeof PaperLightTheme;
