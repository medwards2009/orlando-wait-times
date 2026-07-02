import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Platform, Settings } from 'react-native';

const STORAGE_KEY = 'favoritedAttractionIds';

interface FavoritesContextType {
  favoritedIds: Set<string>;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Settings is iOS-only. Android short-circuits to an empty Set on load and
// silently discards writes. To support Android, swap Settings for a
// cross-platform API such as expo-secure-store or AsyncStorage.
function loadFromStorage(): Set<string> {
  if (Platform.OS !== 'ios') return new Set();
  try {
    const raw = Settings.get(STORAGE_KEY);
    if (typeof raw === 'string') {
      return new Set(JSON.parse(raw) as string[]);
    }
  } catch {
    // Ignore malformed/unavailable storage and fall back to an empty set.
  }
  return new Set();
}

function saveToStorage(ids: Set<string>) {
  if (Platform.OS !== 'ios') return;
  try {
    Settings.set({ [STORAGE_KEY]: JSON.stringify([...ids]) });
  } catch {
    // Best-effort persistence; ignore write failures.
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(favoritedIds);
  }, [favoritedIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoritedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoritedIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
