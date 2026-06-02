import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import HeaderWithMenu from '@/components/header-with-menu';
import { PaperDarkTheme, PaperLightTheme } from '@/constants/paperTheme';
import ParkProvider, { useParkSelection } from '@/contexts/ParkContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

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
  const { selectedPark, setSelectedPark } = useParkSelection();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={colorScheme === 'dark' ? PaperDarkTheme : PaperLightTheme}>
        <Stack
          screenOptions={{
            header: () => (
              <HeaderWithMenu
                title="Orlando Wait Times"
                parkSelection={selectedPark}
                onParkSelectionChange={setSelectedPark}
              />
            ),
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <ParkProvider>
      <FavoritesProvider>
        <RootLayoutContent />
      </FavoritesProvider>
    </ParkProvider>
  );
}
