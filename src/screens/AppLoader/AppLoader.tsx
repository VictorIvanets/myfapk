import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet } from 'react-native';
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
import ScaleInPressable from 'src/components/ScaleInPressable';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type NavigationT = StackNavigationProp<RootStackParamListT>;

const Splash = () => {
  const navigation = useNavigation<NavigationT>();
  const [sever, setServer] = useState<string>();
  const { navigate } = useAppNavigation();
  const animatedSize = new Animated.Value(1);
  const animatedOpacity = new Animated.Value(1);
  const animatedOpacityNull = new Animated.Value(0);

  const welcomeAnimation = (callback?: () => Promise<void>) => {
    Animated.timing(animatedSize, {
      toValue: 50,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedOpacityNull, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(callback);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

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

    sever && welcomeAnimation(checkAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, sever]);

  return (
    <Flex flex style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: animatedSize }],
          opacity: animatedOpacity,
        }}
      >
        <Image
          source={require('../../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
      </Animated.View>
      <Animated.View style={{ opacity: animatedOpacity }}>
        <ActivityIndicator size={100} color={colors.ACCENT} />
        <Text>Server not available yet. Please wait</Text>
      </Animated.View>
      <Animated.View
        style={[styles.greeting, { opacity: animatedOpacityNull }]}
      >
        <Flex flex>
          <Text size="Bh1">WELCOME</Text>
        </Flex>
      </Animated.View>
      <Flex>
        <ScaleInPressable onPress={() => navigate('Rules')}>
          <MaterialIcons name="info-outline" size={50} color={colors.ACCENT} />
        </ScaleInPressable>
      </Flex>
    </Flex>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 110,
    resizeMode: 'contain',
  },
  greeting: {
    position: 'absolute',
  },
});
