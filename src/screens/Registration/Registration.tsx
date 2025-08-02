import React from 'react';
import { StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';

const Registration = () => {
  return (
    <Flex style={styles.container}>
      <Text>Registration</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Registration;
