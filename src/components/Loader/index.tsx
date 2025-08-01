import type { FlexProps } from 'src/components/Flex';
import Flex from 'src/components/Flex';
import type { JSX } from 'react';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import type { ActivityIndicatorProps } from 'react-native';
import { colors, type ColorT } from 'src/theme/colors';

type Props = FlexProps & {
  size?: ActivityIndicatorProps['size'];
  color?: ColorT;
};

function Loader({
  size = 'large',
  flex = true,
  center = true,
  color = 'ACCENT',
  ...props
}: Props): JSX.Element {
  return (
    <Flex flex={flex} center={center} {...props}>
      <ActivityIndicator size={size} color={colors[color]} />
    </Flex>
  );
}

export default Loader;
