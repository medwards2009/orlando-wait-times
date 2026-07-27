import ParkGroupStack from '@/components/park-group-stack';
import { ResortThemeProvider } from '@/contexts/ResortThemeContext';

export default function UniversalLayout() {
  return (
    <ResortThemeProvider resortKey="universal">
      <ParkGroupStack title="Universal Orlando Resort" />
    </ResortThemeProvider>
  );
}
