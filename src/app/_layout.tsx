import {
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts as useFredokaFonts,
} from '@expo-google-fonts/fredoka';
import {
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter';
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
  const [fredokaLoaded] = useFredokaFonts({
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const [interLoaded] = useInterFonts({ Inter_500Medium, Inter_600SemiBold });

  useEffect(() => {
    if (fredokaLoaded && interLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fredokaLoaded, interLoaded]);

  if (!fredokaLoaded || !interLoaded) return null;

  return (
    <FavoritesProvider>
      <RootLayoutContent />
    </FavoritesProvider>
  );
}
