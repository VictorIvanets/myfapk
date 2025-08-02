import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamListT } from 'src/Navigatior/route';
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
    <View style={styles.container}>
      <ActivityIndicator size={150} color={colors.ACCENT} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const token = await AsyncStorage.getItem('jwt');

// await AsyncStorage.setItem('jwt', token);

// await AsyncStorage.removeItem('jwt');
// navigation.reset({
//   index: 0,
//   routes: [{ name: 'Login' }],
// });
