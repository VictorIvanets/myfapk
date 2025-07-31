import { StatusBar, StyleSheet, View } from 'react-native';
import Main from './Main';
import { COLOR } from './constants';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

changeNavigationBarColor(COLOR.MAIN, false);

function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.MAIN} barStyle={'light-content'} />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
