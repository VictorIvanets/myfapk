import React from 'react';
import { StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';
import type { OneFishingT } from 'src/types/fishing';

type FishingCardProps = {
  item: OneFishingT;
};

const FishingCard = ({ item }: FishingCardProps) => {
  return (
    <Flex center flex style={styles.item}>
      <Text>{item.title}</Text>
      <Text>{item.userName}</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 130,
    backgroundColor: colors.BLUE50,
  },
});

export default FishingCard;
