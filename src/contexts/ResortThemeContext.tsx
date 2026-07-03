import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { RESORT_THEMES, ResortKey, ResortTheme, ResortVariant } from '@/constants/resortThemes';

interface ResortThemeValue {
  /** The active resort's full theme (both variants + metadata). */
  theme: ResortTheme;
  /** Colors resolved for the current color scheme. */
  variant: ResortVariant;
  /** Resolved color scheme. */
  scheme: 'light' | 'dark';
}

const ResortThemeContext = createContext<ResortThemeValue | null>(null);

/**
 * Provided by each resort's group layout so every screen underneath renders in
 * that resort's color identity. Resolves light/dark from the system scheme.
 */
export function ResortThemeProvider({
  resortKey,
  children,
}: {
  resortKey: ResortKey;
  children: ReactNode;
}) {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === 'dark' ? 'dark' : 'light';

  const value = useMemo<ResortThemeValue>(() => {
    const theme = RESORT_THEMES[resortKey];
    return { theme, variant: theme[scheme], scheme };
  }, [resortKey, scheme]);

  return <ResortThemeContext.Provider value={value}>{children}</ResortThemeContext.Provider>;
}

/**
 * Read the active resort theme. Falls back to Disney when used outside a
 * provider so it can never crash a screen (only group children rely on it).
 */
export function useResortTheme(): ResortThemeValue {
  const ctx = useContext(ResortThemeContext);
  const colorScheme = useColorScheme();
  const scheme = colorScheme === 'dark' ? 'dark' : 'light';

  if (ctx) return ctx;
  const theme = RESORT_THEMES.disney;
  return { theme, variant: theme[scheme], scheme };
}
