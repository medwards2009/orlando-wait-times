import { useTabBarProps } from '@/hooks/use-tab-bar-props';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function UniversalTabsLayout() {
  const tabBarProps = useTabBarProps();

  return (
    <NativeTabs {...tabBarProps}>
      <NativeTabs.Trigger name="islands-of-adventure">
        <NativeTabs.Trigger.Label>Islands</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'island' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="universal-studios-florida">
        <NativeTabs.Trigger.Label>Universal</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'movie-star' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="epic-universe">
        <NativeTabs.Trigger.Label>Epic Univ.</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'earth' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="volcano-bay">
        <NativeTabs.Trigger.Label>Volcano Bay</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'water' as keyof typeof MaterialCommunityIcons.glyphMap}
            />
          }
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
