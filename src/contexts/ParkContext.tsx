import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ParkSelection = 'disney' | 'universal';

interface ParkContextType {
  selectedPark: ParkSelection;
  setSelectedPark: (park: ParkSelection) => void;
  isLoading: boolean;
}

const ParkContext = createContext<ParkContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedPark';
const DEFAULT_PARK: ParkSelection = 'disney';

export function ParkProvider({ children }: { children: React.ReactNode }) {
  const [selectedPark, setSelectedPark] = useState<ParkSelection>(DEFAULT_PARK);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedPark();
  }, []);

  useEffect(() => {
    savePark(selectedPark);
  }, [selectedPark]);

  const loadSavedPark = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved === 'disney' || saved === 'universal') {
        setSelectedPark(saved as ParkSelection);
      }
    } catch {
      // AsyncStorage native module unavailable — fall back to default
    } finally {
      setIsLoading(false);
    }
  };

  const savePark = async (park: ParkSelection) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, park);
    } catch {
      // AsyncStorage native module unavailable — selection won't persist
    }
  };

  return (
    <ParkContext.Provider value={{ selectedPark, setSelectedPark, isLoading }}>
      {children}
    </ParkContext.Provider>
  );
}

export function useParkSelection() {
  const context = useContext(ParkContext);
  if (!context) {
    throw new Error('useParkSelection must be used within ParkProvider');
  }
  return context;
}

export default ParkProvider;
