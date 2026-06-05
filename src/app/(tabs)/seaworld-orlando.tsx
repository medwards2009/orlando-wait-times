import ParkScreen from '@/components/park-screen';
import { useParkSelection } from '@/contexts/ParkContext';

export default function SeaWorldOrlandoScreen() {
  const { selectedPark } = useParkSelection();

  // Only show if SeaWorld is selected
  if (selectedPark !== 'seaworld') return null;

  return <ParkScreen destinationSlug="seaworldorlandoresort" parkName="SeaWorld Orlando" />;
}
