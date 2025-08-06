import React from 'react';
import { StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';

const InfoTab = ({ data }: TabProps) => {
  return (
    <Flex style={styles.container}>
      <Text color="TEXTDARK">Опис:</Text>
      <Text color="TEXT">{data?.description}</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.ACCENT50,
  },
});

export default InfoTab;
