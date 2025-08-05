import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from 'src/screens/Home/Home';
import type {
  RootHomeTabsParamListT,
  RootStackParamListT,
} from 'src/Navigatior/route';
import Map from 'src/screens/Map/Map';
import { colors } from 'src/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from 'src/screens/Login/Login';
import Splash from 'src/screens/AppLoader/AppLoader';
import Details from 'src/screens/Details/Details';
import Registration from 'src/screens/Registration/Registration';
import Rules from 'src/screens/Rules/Rules';
import Setting from 'src/screens/Setting/Setting';
import CreateFishing from 'src/screens/CreateFishing/CreateFishing';

const Stack = createStackNavigator<RootStackParamListT>();
const Tabs = createBottomTabNavigator<RootHomeTabsParamListT>();

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
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Rules" component={Rules} />
      <Stack.Screen name="CreateFishing" component={CreateFishing} />
    </Stack.Navigator>
  );
};

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
            <Ionicons name="fish" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default Navigator;
