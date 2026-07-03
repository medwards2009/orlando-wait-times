import ParkGroupStack from '@/components/park-group-stack';
import { ResortThemeProvider } from '@/contexts/ResortThemeContext';

export default function LegolandLayout() {
  return (
    <ResortThemeProvider resortKey="legoland">
      <ParkGroupStack title="LEGOLAND Florida" screenName="index" />
    </ResortThemeProvider>
  );
}
