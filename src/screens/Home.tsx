import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { colors } from 'src/theme/colors';

const Home = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Main" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN,
  },
});

export default Home;
