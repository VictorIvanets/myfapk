import React, { useRef } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import type { NavigationContainerRef } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { COLOR, colors } from './theme/colors';
import Flex from './components/Flex';
import type { RootStackParamListT } from './Navigatior/route';
import Navigator from './Navigatior';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import toastConfig from './helpers/toastConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';

changeNavigationBarColor(COLOR.MAIN, false);

function App() {
  const routeNameRef = useRef<string | undefined>(undefined);
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamListT>>(null);
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <Flex style={styles.container}>
        <StatusBar backgroundColor={COLOR.MAIN} barStyle="light-content" />
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current =
                navigationRef.current?.getCurrentRoute()?.name;
            }}
            onStateChange={() => {
              const currentRouteName =
                navigationRef.current?.getCurrentRoute()?.name;
              if (
                currentRouteName &&
                routeNameRef.current !== currentRouteName
              ) {
                routeNameRef.current = currentRouteName;
              }
            }}
          >
            <Navigator />
          </NavigationContainer>
          <Toast topOffset={3} config={toastConfig} />
        </QueryClientProvider>
      </Flex>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
  },
});

export default App;
