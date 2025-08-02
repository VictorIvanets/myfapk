import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  NavigationState,
  CompositeScreenProps,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { SceneMap } from 'react-native-tab-view';

export type NavigationStateRoute = NavigationState['routes'][number];

export type RootHomeTabsParamListT = {
  Home: undefined;
  Map: undefined;
};

export type RootStackParamListT = {
  HomeTabs:
    | undefined
    | {
        screen?: keyof RootHomeTabsParamListT;
      };
  Login: undefined;
  Splash: undefined;
  Details: { name: string; userId: string };
  Registration: undefined;
};

export type SceneProps = Parameters<ReturnType<typeof SceneMap>>[number];

export type HomeTabsScreenProps<
  RouteName extends keyof RootHomeTabsParamListT,
> = CompositeScreenProps<
  BottomTabScreenProps<RootHomeTabsParamListT, RouteName>,
  StackScreenProps<RootStackParamListT>
>;
