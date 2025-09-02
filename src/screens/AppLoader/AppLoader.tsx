import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet } from 'react-native';
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
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type NavigationT = StackNavigationProp<RootStackParamListT>;

const Splash = () => {
  const navigation = useNavigation<NavigationT>();
  const [sever, setServer] = useState<string>();
  const { navigate } = useAppNavigation();
  const animatedSize = useSharedValue(1);
  const animatedOpacity = useSharedValue(1);
  const animatedOpacityNull = useSharedValue(0);

  const welcomeAnimation = useCallback(
    (callback: () => void) => {
      animatedSize.value = withTiming(50, { duration: 500 });
      animatedOpacityNull.value = withTiming(1, { duration: 500 });
      animatedOpacity.value = withTiming(0, { duration: 500 }, () =>
        runOnJS(callback)(),
      );
    },
    [animatedOpacity, animatedOpacityNull, animatedSize],
  );

  const animatedStyleSize = useAnimatedStyle(() => ({
    transform: [{ scale: animatedSize.value }],
    opacity: animatedOpacity.value,
  }));
  const animatedStyleOpacity = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
  }));
  const animatedStyleOpacityNull = useAnimatedStyle(() => ({
    opacity: animatedOpacityNull.value,
  }));

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
  }, [sever, navigation, welcomeAnimation]);

  return (
    <Flex flex style={styles.container}>
      <Animated.View style={animatedStyleSize}>
        <Pressable onPress={() => welcomeAnimation(() => console.log('PRESS'))}>
          <Image
            source={require('../../../assets/images/logoMf-01.png')}
            style={styles.image}
          />
        </Pressable>
      </Animated.View>
      <Animated.View style={animatedStyleOpacity}>
        <ActivityIndicator size={100} color={colors.ACCENT} />
        <Text>Server not available yet. Please wait</Text>
      </Animated.View>
      <Animated.View style={[styles.greeting, animatedStyleOpacityNull]}>
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
