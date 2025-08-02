import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';

const Login = () => {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title="Перейти на HomeTabs"
        onPress={() => navigation.navigate('HomeTabs')}
      />
      <Button
        title="Перейти на Main"
        onPress={() =>
          navigation.navigate('HomeTabs', {
            screen: 'Main',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
