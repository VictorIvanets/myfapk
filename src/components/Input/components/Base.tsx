// import { useEffect, useRef, useState } from 'react';
// import { TextInput, StyleSheet, Pressable } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import FadeInView from 'src/components/FadeInView';
// import Flex from 'src/components/Flex';
// import { INPUT_HORIZONTAL_PADDING } from 'src/components/Input/constants';
// import SvgIcon from 'src/components/SvgIcon';
// import Text from 'src/components/Text';
// import { ANIMATION_DURATION } from 'src/constants/animation';
// import { useTheme } from 'src/contexts/ThemeContext/useTheme';
// import { icons } from 'src/theme/icons';
// import { isIOS } from 'src/utils';
// import type {
//   LayoutChangeEvent,
//   NativeSyntheticEvent,
//   TextInputFocusEventData,
// } from 'react-native';
// import type { InputProps } from 'src/components/Input/types';

// const closeIcon = icons['close-24'];

// const Base = ({
//   floatingPlaceholder,
//   floatingPlaceholderStyle,
//   errorMessage,
//   errorMessageStyle,
//   endIcons,
//   ...inputProps
// }: InputProps): JSX.Element => {
//   const [hasFocus, setHasFocus] = useState<boolean>(false);
//   const iconsWrapperWidth = useRef(0);

//   const { spacing, typography, colors, zIndex } = useTheme();

//   const opacity = inputProps.editable === false ? 0.4 : 1;

//   // floating placeholder styles
//   const translateY = useSharedValue<number>(11);
//   const fontSize = useSharedValue<number>(typography.body.fontSize);
//   const paddingHorizontal = useSharedValue<number>(0);
//   // input  styles
//   const borderWidth = useSharedValue<number>(1);
//   const borderColor = useSharedValue<string>(colors.black100);

//   const floatingPlaceholderAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//     fontSize: fontSize.value,
//     paddingHorizontal: paddingHorizontal.value,
//   }));
//   const inputWrapperAnimatedStyle = useAnimatedStyle(() => ({
//     borderWidth: borderWidth.value,
//     borderColor: borderColor.value,
//   }));

//   const handleFocus = (
//     event: NativeSyntheticEvent<TextInputFocusEventData>,
//   ) => {
//     setHasFocus(true);

//     inputProps.onFocus?.(event);
//   };

//   const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
//     setHasFocus(false);

//     inputProps.onBlur?.(event);
//   };

//   const handleLayout = (event: LayoutChangeEvent) => {
//     iconsWrapperWidth.current = event.nativeEvent.layout.width;
//   };

//   const clearInputValue = () => inputProps.onChangeText?.('');

//   useEffect(() => {
//     const shouldShowInputActiveState = hasFocus || inputProps.value;

//     translateY.value = withTiming(shouldShowInputActiveState ? -17 : 11, {
//       duration: ANIMATION_DURATION,
//     });

//     fontSize.value = withTiming(
//       shouldShowInputActiveState
//         ? typography.subtitle.fontSize
//         : typography.body.fontSize,

//       {
//         duration: ANIMATION_DURATION,
//       },
//     );

//     paddingHorizontal.value = withTiming(
//       shouldShowInputActiveState ? spacing.s2 : 0,
//       {
//         duration: ANIMATION_DURATION,
//       },
//     );

//     borderWidth.value = withTiming(hasFocus ? 2 : 1, {
//       duration: ANIMATION_DURATION,
//     });

//     borderColor.value = withTiming(
//       hasFocus ? colors.yellow500 : colors.black100,
//       {
//         duration: ANIMATION_DURATION,
//       },
//     );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hasFocus, inputProps.value]);

//   return (
//     <Flex
//       style={[
//         s.container,
//         {
//           opacity,
//         },
//       ]}
//       gap="s1"
//       rel
//     >
//       <Animated.View style={[s.inputWrapper, inputWrapperAnimatedStyle]}>
//         <TextInput
//           style={[
//             typography.body,
//             s.input,
//             {
//               paddingEnd: iconsWrapperWidth.current + INPUT_HORIZONTAL_PADDING,
//               color: colors.main,
//             },
//             inputProps.style,
//           ]}
//           selectionColor={colors.main}
//           placeholderTextColor={hasFocus ? colors.main : colors.black100}
//           {...inputProps}
//           autoComplete="off"
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//         />
//         {floatingPlaceholder && (
//           <Animated.Text
//             style={[
//               s.floatingPlaceholder,
//               {
//                 color: hasFocus ? colors.main : colors.black100,
//                 backgroundColor: colors.background,
//                 zIndex: zIndex.behind,
//               },
//               typography.body,
//               floatingPlaceholderAnimatedStyle,
//               floatingPlaceholderStyle,
//             ]}
//           >
//             {floatingPlaceholder}
//           </Animated.Text>
//         )}
//         <Flex
//           style={[s.iconsWrapper, { paddingRight: INPUT_HORIZONTAL_PADDING }]}
//           absR
//           row
//           centerH
//           gap="s2"
//           onLayout={handleLayout}
//         >
//           {hasFocus && (
//             <Pressable onPress={clearInputValue}>
//               <SvgIcon icon={closeIcon} />
//             </Pressable>
//           )}
//           {endIcons &&
//             endIcons.map(({ icon, onPress }, index) => (
//               <Pressable onPress={onPress} key={index}>
//                 {icon}
//               </Pressable>
//             ))}
//         </Flex>
//       </Animated.View>
//       {errorMessage && (
//         <FadeInView>
//           <Text
//             style={[s.errorMessage, errorMessageStyle]}
//             color="red500"
//             size="body"
//           >
//             {errorMessage}
//           </Text>
//         </FadeInView>
//       )}
//     </Flex>
//   );
// };

// const s = StyleSheet.create({
//   container: {
//     width: '100%',
//   },
//   inputWrapper: {
//     borderRadius: 12,
//     height: 48,
//   },
//   input: {
//     height: '100%',
//     paddingHorizontal: INPUT_HORIZONTAL_PADDING,
//     ...(isIOS && { lineHeight: 0 }),
//   },
//   floatingPlaceholder: {
//     pointerEvents: 'none',
//     position: 'absolute',
//     left: INPUT_HORIZONTAL_PADDING,
//   },
//   iconsWrapper: {
//     height: '100%',
//   },
//   errorMessage: {
//     alignSelf: 'flex-end',
//   },
// });

// export default Base;
