import ParkGroupStack from '@/components/park-group-stack';
import { ResortThemeProvider } from '@/contexts/ResortThemeContext';

export default function DisneyLayout() {
  return (
    <ResortThemeProvider resortKey="disney">
      <ParkGroupStack title="Walt Disney World" />
    </ResortThemeProvider>
  );
}
