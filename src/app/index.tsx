import { useParkSelection } from '@/contexts/ParkContext';
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  const { selectedPark, isLoading } = useParkSelection();

  if (isLoading) return null;

  const firstTab =
    selectedPark === 'universal' ? '/(tabs)/islands-of-adventure' : '/(tabs)/magic-kingdom';

  return <Redirect href={firstTab} />;
}
