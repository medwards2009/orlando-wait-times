import { useTabBarProps } from '@/hooks/use-tab-bar-props';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function SeaworldTabsLayout() {
  const tabBarProps = useTabBarProps();

  return (
    <NativeTabs {...tabBarProps}>
      <NativeTabs.Trigger name="seaworld-orlando">
        <NativeTabs.Trigger.Label>SeaWorld</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'waves' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="aquatica">
        <NativeTabs.Trigger.Label>Aquatica</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'pool' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
