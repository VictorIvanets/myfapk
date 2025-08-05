import { Animated, Pressable, StyleSheet } from 'react-native';
import type { FC } from 'react';
import React, { useRef } from 'react';
import type { ViewProps, PressableProps } from 'react-native';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';
import { spacings } from 'src/theme';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  view?: 'big' | 'small' | 'max';
  loading?: boolean;
  style?: ViewProps['style'];
  title: string;
  outline?: boolean;
};

const Button: FC<ButtonProps> = ({
  view = 'big',
  disabled,
  title,
  style: buttonStyle,
  outline,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 0,
    }).start();
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPressIn={animateIn}
      onPressOut={animateOut}
    >
      {({ pressed }) => (
        <Animated.View
          style={[
            view === 'big' && s.general,
            view === 'small' && s.small,
            view === 'max' && s.max,
            buttonStyle,
            disabled && s.disabled,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              borderColor: outline ? colors.ACCENT50 : 'none',
              borderWidth: outline ? 1 : 0,
              backgroundColor:
                !outline && pressed
                  ? colors.ACCENT50
                  : outline && pressed
                  ? colors.ACCENT50
                  : outline
                  ? colors.SECOND50
                  : colors.ACCENT,
              transform: [{ scale }],
            },
          ]}
        >
          <Flex>
            <Text
              size={
                view === 'big'
                  ? 'headline'
                  : view === 'small'
                  ? 'body'
                  : 'headline'
              }
              color="WHITE"
            >
              {title}
            </Text>
          </Flex>
        </Animated.View>
      )}
    </Pressable>
  );
};

const s = StyleSheet.create({
  general: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    height: 50,
    borderRadius: spacings.s2,
    margin: spacings.s1,
  },
  small: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    height: 30,
    borderRadius: spacings.s2,
    margin: spacings.s1,
  },
  max: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    height: 50,
    borderRadius: spacings.s2,
    margin: spacings.s1,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
