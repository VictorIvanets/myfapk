import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  NavigationState,
  CompositeScreenProps,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { SceneMap } from 'react-native-tab-view';
import type { OneFishingT } from 'src/types/fishing';
import type { LeafletViewCoordsT } from 'src/types/map.types';

export type NavigationStateRoute = NavigationState['routes'][number];

export type RootHomeTabsParamListT = {
  Home: undefined;
  Map: { coords?: LeafletViewCoordsT };
  Posts: undefined;
  Paid: undefined;
  Advertising: undefined;
  // Rules: undefined;
};

export type RootStackParamListT = {
  HomeTabs:
    | undefined
    | {
        screen?: keyof RootHomeTabsParamListT;
      };
  Login: undefined;
  Splash: undefined;
  Details: { id: string };
  Registration: undefined;
  CreateFishing: { coords?: LeafletViewCoordsT; updata?: OneFishingT };
  Setting: undefined;
  Rules: undefined;
  Map: { coords?: LeafletViewCoordsT };
};

export type SceneProps = Parameters<ReturnType<typeof SceneMap>>[number];

export type HomeTabsScreenProps<
  RouteName extends keyof RootHomeTabsParamListT,
> = CompositeScreenProps<
  BottomTabScreenProps<RootHomeTabsParamListT, RouteName>,
  StackScreenProps<RootStackParamListT>
>;
