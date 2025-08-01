import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { DimensionValue, ViewProps } from 'react-native';
import { colors, type ColorT } from 'src/theme/colors';
import type { SpacingsT } from 'src/theme/spacings';
import { spacings } from 'src/theme/spacings';

export type FlexProps = ViewProps & {
  width?: DimensionValue;
  height?: DimensionValue;
  maxW?: DimensionValue;
  maxH?: DimensionValue;
  flex?: boolean | number;
  flexS?: boolean | number;
  flexG?: boolean | number;
  left?: boolean;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  row?: boolean;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
  spread?: boolean;
  gap?: SpacingsT;
  abs?: boolean;
  absL?: boolean;
  absT?: boolean;
  absR?: boolean;
  absB?: boolean;
  absH?: boolean;
  absV?: boolean;
  absF?: boolean;
  rel?: boolean;
  bBLRadius?: number;
  bBRRadius?: number;
  bRadius?: number;
  bWidth?: number;
  wrap?: boolean;
  overflow?: boolean;
  bg?: ColorT;
  bColor?: ColorT;
};

const Flex = ({
  flex,
  flexS,
  flexG,
  left,
  top,
  right,
  bottom,
  row,
  center,
  centerH,
  centerV,
  spread,
  gap,
  abs,
  absL,
  absT,
  absR,
  absB,
  absH,
  absV,
  absF,
  rel,
  bg,
  style,
  width,
  height,
  maxH,
  maxW,
  bBLRadius,
  bBRRadius,
  bRadius,
  bColor,
  bWidth,
  wrap,
  overflow,
  ...props
}: FlexProps) => {
  const styles = StyleSheet.create({
    flex: flex ? { flex: typeof flex === 'number' ? flex : 1 } : {},
    flexS: flexS ? { flexShrink: typeof flexS === 'number' ? flexS : 1 } : {},
    flexG: flexG ? { flexGrow: typeof flexG === 'number' ? flexG : 1 } : {},
    left: left ? { alignItems: 'flex-start' } : {},
    top: top ? { justifyContent: 'flex-start' } : {},
    right: right ? { alignItems: 'flex-end' } : {},
    bottom: bottom ? { justifyContent: 'flex-end' } : {},
    row: row ? { flexDirection: 'row' } : { flexDirection: 'column' },
    center: center ? { justifyContent: 'center', alignItems: 'center' } : {},
    centerH: centerH ? { alignItems: 'center' } : {},
    centerV: centerV ? { justifyContent: 'center' } : {},
    spread: spread ? { justifyContent: 'space-between' } : {},
    gap: gap ? { gap: spacings[gap] } : {},
    abs: abs ? { position: 'absolute' } : {},
    absL: absL ? { position: 'absolute', left: 0 } : {},
    absT: absT ? { position: 'absolute', top: 0 } : {},
    absR: absR ? { position: 'absolute', right: 0 } : {},
    absB: absB ? { position: 'absolute', bottom: 0 } : {},
    absH: absH ? { position: 'absolute', left: 0, right: 0 } : {},
    absV: absV ? { position: 'absolute', top: 0, bottom: 0 } : {},
    absF: absF ? StyleSheet.absoluteFillObject : {},
    rel: rel ? { position: 'relative' } : {},
    maxW: maxW ? { maxWidth: maxW } : {},
    maxH: maxH ? { maxHeight: maxH } : {},
    width: width ? { width } : {},
    height: height ? { height } : {},
    bBLRadius: bBLRadius ? { borderBottomLeftRadius: bBLRadius } : {},
    bBRRadius: bBRRadius ? { borderBottomRightRadius: bBRRadius } : {},
    bRadius: bRadius ? { borderRadius: bRadius } : {},
    bg: bg ? { backgroundColor: colors[bg] } : {},
    bColor: bColor ? { borderColor: colors[bColor] } : {},
    bWidth: bWidth ? { borderWidth: bWidth } : {},
    wrap: wrap ? { flexWrap: 'wrap' } : {},
    overflow: overflow ? { overflow: 'hidden' } : {},
  });
  const combinedStyle = [
    styles.flex,
    styles.flexS,
    styles.flexG,
    styles.left,
    styles.top,
    styles.right,
    styles.bottom,
    styles.row,
    styles.center,
    styles.centerH,
    styles.centerV,
    styles.spread,
    styles.gap,
    styles.abs,
    styles.absL,
    styles.absT,
    styles.absR,
    styles.absB,
    styles.absH,
    styles.absV,
    styles.absF,
    styles.rel,
    styles.bg,
    styles.width,
    styles.height,
    styles.maxW,
    styles.maxH,
    styles.bBLRadius,
    styles.bBRRadius,
    styles.bRadius,
    styles.bColor,
    styles.bWidth,
    styles.wrap,
    styles.overflow,
    style,
  ];

  return <View style={combinedStyle} {...props} />;
};

export default Flex;
