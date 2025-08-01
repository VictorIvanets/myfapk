import React from 'react';
import { StyleSheet } from 'react-native';
import Flex from './components/Flex';
import Text from './components/Text';
import Loader from './components/Loader';
import Button from './components/Button';
import FadeInView from 'src/components/FadeInView';
import InputText from './components/InputText/InputText';

const Main = () => {
  return (
    <FadeInView style={styles.container}>
      <Flex center flex>
        <Text size="h1" style={styles.text}>
          Main
        </Text>
        <Text color="ACCENT" size="Bh1" style={styles.text}>
          Main
        </Text>
        {/* <Text size="h2" style={styles.text}>
          Main
        </Text>
        <Text size="h3" style={styles.text}>
          Main
        </Text>
        <Text size="h4" style={styles.text}>
          Main
        </Text>
        <Text style={styles.text}>Main</Text>
        <Button view="small" title="small" />
        <Button view="max" title="Maximum" /> */}
      </Flex>
      <InputText />
      <Button onPress={() => console.log('press1')} title="Button" />
      <Loader />
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Raleway-Light',
    // fontWeight: 800,
  },
});

export default Main;
