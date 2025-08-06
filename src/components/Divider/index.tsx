import type { JSX } from 'react';
import { View } from 'react-native';

type Props = {
  height?: number;
};

const Divider = ({ height = 16 }: Props): JSX.Element => {
  return <View style={{ height: height }} />;
};

export default Divider;
