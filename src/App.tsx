import { StatusBar, StyleSheet } from 'react-native';
import Main from './Main';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { COLOR } from './theme/colors';
import Flex from './components/Flex';
import { NavigationContainer } from '@react-navigation/native';

changeNavigationBarColor(COLOR.MAIN, false);

function App() {
  return (
    <Flex style={styles.container}>
      <StatusBar backgroundColor={COLOR.MAIN} barStyle={'light-content'} />
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
