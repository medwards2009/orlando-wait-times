import {
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter';
import { Manrope_700Bold, useFonts as useManropeFonts } from '@expo-google-fonts/manrope';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { PaperDarkTheme, PaperLightTheme } from '@/constants/paperTheme';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function RootLayoutContent() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={colorScheme === 'dark' ? PaperDarkTheme : PaperLightTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  const [manropeLoaded] = useManropeFonts({ Manrope_700Bold });
  const [interLoaded] = useInterFonts({ Inter_500Medium, Inter_600SemiBold });

  useEffect(() => {
    if (manropeLoaded && interLoaded) {
      SplashScreen.hideAsync();
    }
  }, [manropeLoaded, interLoaded]);

  if (!manropeLoaded || !interLoaded) return null;

  return (
    <FavoritesProvider>
      <RootLayoutContent />
    </FavoritesProvider>
  );
}
