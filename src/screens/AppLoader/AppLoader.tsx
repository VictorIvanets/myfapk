import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamListT } from 'src/Navigatior/route';
import { colors } from 'src/theme/colors';
import { loadState } from 'src/api/storage';
import { STORAGE_KEYS_ACCESS_TOKEN } from 'src/api/PREFIX';
import type { LoginResponseT } from 'src/types/auth.types';
import { enterServices } from 'src/services/enter.services';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';

type NavigationT = StackNavigationProp<RootStackParamListT>;

const Splash = () => {
  const navigation = useNavigation<NavigationT>();
  const [sever, setServer] = useState<string>();

  useEffect(() => {
    let interval: number;

    const checkServer = async () => {
      try {
        const res = await enterServices.checkLoadingServer();
        if (res) {
          setServer(res);
          clearInterval(interval);
        }
      } catch (e) {
        console.log('Server not available yet', e);
      }
    };

    checkServer();
    interval = setInterval(checkServer, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await loadState<LoginResponseT>(STORAGE_KEYS_ACCESS_TOKEN);
      if (token?.access_token) {
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

    sever && checkAuth();
  }, [navigation, sever]);

  return (
    <Flex flex center style={styles.container}>
      <ActivityIndicator size={150} color={colors.ACCENT} />
      <Text>Server not available yet. Please wait</Text>
    </Flex>
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
