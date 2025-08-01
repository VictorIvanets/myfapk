import { Text as RNText, StyleSheet } from 'react-native';
import type { TextProps } from 'react-native';
import type { TypographyT } from 'src/theme';
import { typography } from 'src/theme';
import { colors, type ColorT } from 'src/theme/colors';

type Props = TextProps & {
  color?: ColorT;
  size?: TypographyT;
  center?: boolean;
};

const Text = ({
  color = 'TEXT',
  size = 'body',
  center = false,
  style,
  ...props
}: Props) => {
  const s = StyleSheet.create({
    textCenter: center ? { textAlign: 'center' } : { textAlign: 'auto' },
  });

  return (
    <RNText
      style={[style, s.textCenter, typography[size], { color: colors[color] }]}
      {...props}
    />
  );
};

export default Text;
