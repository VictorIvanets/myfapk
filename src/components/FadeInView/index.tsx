import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ViewProps } from 'react-native';
import type { JSX } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const FadeInView = ({ style, ...props }: ViewProps): JSX.Element => {
  const opacity = useSharedValue(0);

  useFocusEffect(() => {
    opacity.value = withTiming(1, { duration: 250 });

    return () => {
      opacity.value = withTiming(0, { duration: 250 });
    };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View {...props} style={[style, animatedStyle]} />;
};

export default FadeInView;
