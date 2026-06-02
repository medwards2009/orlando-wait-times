import ParkScreen from '@/components/park-screen';
import { useParkSelection } from '@/contexts/ParkContext';

export default function EpicUniverseScreen() {
  const { selectedPark } = useParkSelection();
  if (selectedPark !== 'universal') return null;
  return <ParkScreen destinationSlug="universalresort_orlando" parkName="Epic Universe" />;
}
