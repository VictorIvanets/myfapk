import React from 'react';
import { StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';

const PhotoTab = ({ data }: TabProps) => {
  return (
    <Flex style={styles.container}>
      <Text>PhotoTab</Text>
      <Text>{data?.img.length}</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default PhotoTab;
