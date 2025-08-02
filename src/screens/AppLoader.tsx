import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamListT } from 'src/types/route';
import { colors } from 'src/theme/colors';

type NavigationT = StackNavigationProp<RootStackParamListT>;

const Splash = () => {
  const navigation = useNavigation<NavigationT>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = false;
      //   const token = await AsyncStorage.getItem('jwt');
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeTabs' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: colors.MAIN,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size={150} color={colors.ACCENT} />
    </View>
  );
};

export default Splash;

// const token = await AsyncStorage.getItem('jwt');

// await AsyncStorage.setItem('jwt', token);

// await AsyncStorage.removeItem('jwt');
// navigation.reset({
//   index: 0,
//   routes: [{ name: 'Login' }],
// });
