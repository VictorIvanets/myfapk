import React, { useRef } from 'react';
import { StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'src/theme/colors';
import ScaleInPressable from '../ScaleInPressable';

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = 64;
const EDGE_PADDING = 10;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const DraggableAddButton = ({
  addView,
  setAddView,
}: {
  addView: boolean;
  setAddView: (v: boolean) => void;
}) => {
  const initialX = width - BUTTON_SIZE - EDGE_PADDING;
  const initialY = height - BUTTON_SIZE - 120;

  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const posRef = useRef({ x: initialX, y: initialY });
  const startRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_evt, gestureState) =>
        Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        startRef.current = { ...posRef.current };
        movedRef.current = false;
      },
      onPanResponderMove: (_evt, gestureState) => {
        const isDrag =
          Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
        if (isDrag) movedRef.current = true;

        const newX = clamp(
          startRef.current.x + gestureState.dx,
          EDGE_PADDING,
          width - BUTTON_SIZE - EDGE_PADDING,
        );
        const newY = clamp(
          startRef.current.y + gestureState.dy,
          EDGE_PADDING,
          height - BUTTON_SIZE - EDGE_PADDING,
        );

        pan.setValue({ x: newX, y: newY });
        posRef.current = { x: newX, y: newY };
      },
      onPanResponderRelease: () => {
        if (!movedRef.current) return;
        const finalX =
          posRef.current.x + BUTTON_SIZE / 2 > width / 2
            ? width - BUTTON_SIZE - EDGE_PADDING
            : EDGE_PADDING;

        Animated.spring(pan, {
          toValue: { x: finalX, y: posRef.current.y },
          useNativeDriver: false,
          bounciness: 6,
        }).start(() => {
          posRef.current = { x: finalX, y: posRef.current.y };
        });
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.add, { transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      <ScaleInPressable
        onPress={() => {
          setAddView(!addView);
        }}
      >
        <Animated.View style={styles.addbox}>
          <MaterialIcons name="post-add" size={36} color={colors.WHITE} />
        </Animated.View>
      </ScaleInPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  add: { position: 'absolute', zIndex: 999 },
  addbox: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: colors.ACCENT,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.SECOND20,
    borderWidth: 2,
  },
});

export default DraggableAddButton;
