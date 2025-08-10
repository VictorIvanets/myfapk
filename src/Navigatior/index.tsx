import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamListT } from 'src/Navigatior/route';
import { colors } from 'src/theme/colors';
import Login from 'src/screens/Login/Login';
import Splash from 'src/screens/AppLoader/AppLoader';
import Details from 'src/screens/Details/Details';
import Registration from 'src/screens/Registration/Registration';
import CreateFishing from 'src/screens/CreateFishing/CreateFishing';
import { HomeTabs } from './HomeTabs';
import Setting from 'src/screens/Setting/Setting';
import Rules from 'src/screens/Rules/Rules';

const Stack = createStackNavigator<RootStackParamListT>();

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
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Rules" component={Rules} />
      <Stack.Screen name="CreateFishing" component={CreateFishing} />
    </Stack.Navigator>
  );
};

export default Navigator;
