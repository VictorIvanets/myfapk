import React from 'react';
import { StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Text from 'src/components/Text';
import Flex from 'src/components/Flex';

const SettingTab = ({ data }: TabProps) => {
  return (
    <Flex style={styles.container}>
      <Text>SettingTab</Text>
      <Text>{data?._id}</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default SettingTab;
