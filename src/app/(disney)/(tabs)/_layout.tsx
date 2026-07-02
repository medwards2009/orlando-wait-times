import { useTabBarProps } from '@/hooks/use-tab-bar-props';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function DisneyTabsLayout() {
  const tabBarProps = useTabBarProps();

  return (
    <NativeTabs {...tabBarProps}>
      <NativeTabs.Trigger name="magic-kingdom">
        <NativeTabs.Trigger.Label>Magic</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'castle' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="epcot">
        <NativeTabs.Trigger.Label>Epcot</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'sphere' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="hollywood-studios">
        <NativeTabs.Trigger.Label>Studios</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'movie' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="animal-kingdom">
        <NativeTabs.Trigger.Label>Animal</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'paw' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
