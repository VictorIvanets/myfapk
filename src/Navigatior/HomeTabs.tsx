import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from 'src/screens/Home/Home';
import type { RootHomeTabsParamListT } from 'src/Navigatior/route';
import Map from 'src/screens/Map/Map';
import { colors } from 'src/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setting from 'src/screens/Setting/Setting';

const Tabs = createBottomTabNavigator<RootHomeTabsParamListT>();

export const HomeTabs = () => {
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
          title: 'Рибалки',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fish" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Карта',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Setting"
        component={Setting}
        options={{
          title: 'Налаштування',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
