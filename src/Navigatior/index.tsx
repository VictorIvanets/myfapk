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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from 'src/screens/Login';
import Splash from 'src/screens/AppLoader';
import Details from 'src/screens/Details';

const Stack = createStackNavigator<RootStackParamListT>();
const Tabs = createBottomTabNavigator<RootHomeTabsParamListT>();

const HomeTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ACCENT,
        tabBarInactiveTintColor: colors.TEXT,
        tabBarStyle: {
          backgroundColor: colors.SECOND,
          borderColor: colors.BLUE,
          borderRadius: 10,
          width: '95%',
          margin: 'auto',
          height: 55,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fish" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const Navigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.MAIN,
        },
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Details" component={Details} />
      {/* Інші Stack-екрани типу Login, Splash, тощо можна додати тут */}
    </Stack.Navigator>
  );
};

export default Navigator;
