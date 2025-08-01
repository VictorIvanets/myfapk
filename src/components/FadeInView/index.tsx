import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { JSX } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from 'src/theme/colors';

const FadeInView = ({
  style,
  children,
  ...props
}: ViewProps & { children: React.ReactNode }): JSX.Element => {
  const opacity = useSharedValue(0);

  useFocusEffect(() => {
    opacity.value = withTiming(1, { duration: 250 });

    return () => {
      opacity.value = withTiming(0, { duration: 250 });
    };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    backgroundColor: colors.MAIN,
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.MAIN }]}>
      <Animated.View
        {...props}
        style={[styles.container, animatedStyle, style]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default FadeInView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
