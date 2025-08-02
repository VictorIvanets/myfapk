import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type {
  RootStackParamListT,
  RootHomeTabsParamListT,
} from 'src/Navigatior/route';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StackNavigationProp } from '@react-navigation/stack';

type AppNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootHomeTabsParamListT>,
  StackNavigationProp<RootStackParamListT>
>;

export const useAppNavigation = () => {
  return useNavigation<AppNavigationProp>();
};
