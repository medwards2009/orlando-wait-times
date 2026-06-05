import ParkScreen from '@/components/park-screen';
import { Colors } from '@/constants/theme';
import { useParkSelection } from '@/contexts/ParkContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const { selectedPark, isLoading } = useParkSelection();
  const router = useRouter();
  const isFirstRender = useRef(true);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme as keyof typeof Colors];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (selectedPark === 'disney') {
      router.replace('/(tabs)/magic-kingdom');
    } else if (selectedPark === 'universal') {
      router.replace('/(tabs)/islands-of-adventure');
    } else if (selectedPark === 'seaworld') {
      router.replace('/(tabs)/seaworld-orlando');
    }
    // legoland: rendered directly below, no tab route to navigate to
  }, [selectedPark]);

  if (isLoading) return null;

  // LEGOLAND Florida is a single park — render it directly with no bottom subnav.
  if (selectedPark === 'legoland') {
    return <ParkScreen destinationSlug="legolandorlandoresort" parkName="LEGOLAND Florida" />;
  }

  // Unselected icons use the text color; selected icon defaults to system blue.
  // Labels stay the text color in both states (no blue highlight on selection).
  const tabBarProps = {
    iconColor: { default: colors.text },
    labelStyle: {
      normal: { color: colors.text, fontSize: 10 },
      selected: { color: colors.text, fontSize: 10 },
    },
  };

  if (selectedPark === 'disney') {
    return (
      <NativeTabs {...tabBarProps}>
        <NativeTabs.Trigger name="magic-kingdom">
          <NativeTabs.Trigger.Label>Magic</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon
                family={MaterialCommunityIcons}
                name={'castle' as any}
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
                name={'sphere' as any}
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
                name={'movie' as any}
              />
            }
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="animal-kingdom">
          <NativeTabs.Trigger.Label>Animal</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name={'paw' as any} />
            }
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  if (selectedPark === 'seaworld') {
    return (
      <NativeTabs {...tabBarProps}>
        <NativeTabs.Trigger name="seaworld-orlando">
          <NativeTabs.Trigger.Label>SeaWorld</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon
                family={MaterialCommunityIcons}
                name={'waves' as any}
              />
            }
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="aquatica">
          <NativeTabs.Trigger.Label>Aquatica</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name={'pool' as any} />
            }
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <NativeTabs {...tabBarProps}>
      <NativeTabs.Trigger name="islands-of-adventure">
        <NativeTabs.Trigger.Label>Islands</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name={'island' as any} />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="universal-studios-florida">
        <NativeTabs.Trigger.Label>Universal</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name={'movie-star' as any}
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="epic-universe">
        <NativeTabs.Trigger.Label>Epic Univ.</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name={'earth' as any} />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="volcano-bay">
        <NativeTabs.Trigger.Label>Volcano Bay</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name={'water' as any} />
          }
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
