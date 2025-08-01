// Navigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from 'src/screens/Home';
import type {
  RootHomeTabsParamListT,
  RootStackParamListT,
} from 'src/types/route';
import Main from 'src/Main';
import { colors } from 'src/theme/colors';

const Stack = createStackNavigator<RootStackParamListT>();
const Tabs = createBottomTabNavigator<RootHomeTabsParamListT>();

const HomeTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.MAIN, // або COLOR.MAIN
          borderColor: colors.BLUE,
        },
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Main" component={Main} />
    </Tabs.Navigator>
  );
};

const Navigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.MAIN,
        },
      }}
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      {/* Інші Stack-екрани типу Login, Splash, тощо можна додати тут */}
    </Stack.Navigator>
  );
};

export default Navigator;
