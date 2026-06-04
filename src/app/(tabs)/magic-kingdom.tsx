import ParkScreen from '@/components/park-screen';
import { useParkSelection } from '@/contexts/ParkContext';

export default function MagicKingdomScreen() {
  const { selectedPark } = useParkSelection();

  // Only show if Disney is selected
  if (selectedPark !== 'disney') return null;

  return <ParkScreen destinationSlug="waltdisneyworldresort" parkName="Magic Kingdom" />;
}
