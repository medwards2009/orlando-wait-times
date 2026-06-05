import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { ParkSelection } from '@/contexts/ParkContext';

const PARK_OPTIONS = [
  { value: 'disney' as const, label: 'Walt Disney World' },
  { value: 'universal' as const, label: 'Universal Orlando Resort' },
  { value: 'seaworld' as const, label: 'SeaWorld Orlando' },
  { value: 'legoland' as const, label: 'LEGOLAND Florida' },
];

interface HeaderWithMenuProps {
  title: string;
  parkSelection: ParkSelection;
  onParkSelectionChange: (value: ParkSelection) => void;
}

export function HeaderWithMenu({ title, parkSelection, onParkSelectionChange }: HeaderWithMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Appbar.Header style={styles.header}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action icon="menu" onPress={() => setMenuVisible(true)} />
        }
      >
        {PARK_OPTIONS.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => {
              onParkSelectionChange(option.value);
              setMenuVisible(false);
            }}
            title={option.label}
            leadingIcon={parkSelection === option.value ? 'check' : undefined}
          />
        ))}
      </Menu>
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HeaderWithMenu;
