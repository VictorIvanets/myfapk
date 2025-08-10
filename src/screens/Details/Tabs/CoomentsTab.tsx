import React from 'react';
import { StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';

const CommentsTab = ({ data }: TabProps) => {
  return (
    <Flex style={styles.container}>
      <Text size="h3" color="ACCENT">
        {data?._id}
      </Text>
      <Text size="h3" color="ACCENT">
        COMMENTS
      </Text>
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

export default CommentsTab;
