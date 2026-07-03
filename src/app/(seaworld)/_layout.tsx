import ParkGroupStack from '@/components/park-group-stack';
import { ResortThemeProvider } from '@/contexts/ResortThemeContext';

export default function SeaworldLayout() {
  return (
    <ResortThemeProvider resortKey="seaworld">
      <ParkGroupStack title="SeaWorld Orlando" />
    </ResortThemeProvider>
  );
}
