import ParkScreen from '@/components/park-screen';
import { useParkSelection } from '@/contexts/ParkContext';

export default function UniversalStudiosFlorida() {
  const { selectedPark } = useParkSelection();

  // Only show if Universal is selected
  if (selectedPark !== 'universal') return null;

  return <ParkScreen destinationSlug="universalresort_orlando" parkName="Universal Studios Florida" />;
}
