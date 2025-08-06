import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type {
  GestureResponderEvent,
  PressableProps,
  ViewProps,
} from 'react-native';
import type { JSX } from 'react';

const ANIMATION_DURATION = 200;

type Props = Omit<PressableProps, 'children'> & {
  children: ViewProps['children'];
  startOpacity?: number;
  startScale?: number;
  endOpacity?: number;
  endScale?: number;
};

const ScaleInPressable = ({
  children,
  startOpacity = 1,
  startScale = 1,
  endOpacity = 0.85,
  endScale = 0.95,
  ...props
}: Props): JSX.Element => {
  const opacity = useSharedValue(startOpacity);
  const scale = useSharedValue(startScale);

  const handlePressIn = (event: GestureResponderEvent) => {
    scale.value = withTiming(endScale, { duration: ANIMATION_DURATION });
    opacity.value = withTiming(endOpacity, { duration: ANIMATION_DURATION });

    props.onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.value = withTiming(startScale, { duration: ANIMATION_DURATION });
    opacity.value = withTiming(startOpacity, { duration: ANIMATION_DURATION });

    props.onPressOut?.(event);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable {...props} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};

export default ScaleInPressable;
