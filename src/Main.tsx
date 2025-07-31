import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main</Text>
      <Text style={styles.text}>Main</Text>
      <Text style={styles.text}>Main</Text>
      <Text style={styles.text}>Main</Text>
    </View>
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
  },
});

export default Main;
