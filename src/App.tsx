import React, { useRef } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import type { NavigationContainerRef } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { COLOR, colors } from './theme/colors';
import Flex from './components/Flex';
import type { RootStackParamListT } from './Navigatior/route';
import Navigator from './Navigatior';

changeNavigationBarColor(COLOR.MAIN, false);

function App() {
  const routeNameRef = useRef<string | undefined>(undefined);
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamListT>>(null);

  return (
    <Flex style={styles.container}>
      <StatusBar backgroundColor={COLOR.MAIN} barStyle="light-content" />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        }}
        onStateChange={() => {
          const currentRouteName =
            navigationRef.current?.getCurrentRoute()?.name;
          if (currentRouteName && routeNameRef.current !== currentRouteName) {
            routeNameRef.current = currentRouteName;
          }
        }}
      >
        <Navigator />
      </NavigationContainer>
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
  },
});

export default App;
