import React from 'react';
import { StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import type { ColorItemCardT, ColorsKey } from '../PostCard/colorSchemaCard';

type Props = {
  setColorValue: (name: ColorsKey) => void;
  colorValue: ColorsKey;
} & ColorItemCardT;

const ColorCard = ({
  background,
  text,
  name,
  setColorValue,
  colorValue,
}: Props) => {
  return (
    <ScaleInPressable onPress={() => setColorValue(name)}>
      <Flex
        bg={background}
        center
        // eslint-disable-next-line react-native/no-inline-styles
        style={[{ borderWidth: colorValue === name ? 3 : 0.3 }, styles.bgbox]}
      >
        <Text color={text} center size="Bsubtitle">
          Text
        </Text>
      </Flex>
    </ScaleInPressable>
  );
};

const styles = StyleSheet.create({
  bgbox: {
    width: 60,
    height: 40,
    borderColor: '#c8ff00',
    borderRadius: 5,
  },
});

export default ColorCard;
