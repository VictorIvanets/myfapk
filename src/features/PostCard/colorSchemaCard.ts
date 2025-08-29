import type { ColorT } from 'src/theme/colors';

const schema: schemaT = {
  red: {
    background: 'RED',
    text: 'WHITE',
  },
  blue: {
    background: 'ACCENT',
    text: 'TEXT',
  },
  black: {
    background: 'MAIN',
    text: 'TEXT',
  },
  textgray: {
    background: 'SECOND',
    text: 'WHITE',
  },
  gray: {
    background: 'SECOND',
    text: 'WHITE',
  },
  green: {
    background: 'TEXT',
    text: 'ACCENT',
  },
  white: {
    background: 'WHITE',
    text: 'RED',
  },
  orange: {
    background: 'ORANGE',
    text: 'WHITE',
  },
};

export type ColorItemT = {
  background: ColorT;
  text: ColorT;
};
export type ColorItemCardT = {
  name: ColorsKey;
  background: ColorT;
  text: ColorT;
};

type schemaT = Record<ColorsKey, ColorItemT>;

type SchemaKey = keyof typeof schema;

export default function colorSchemaCard(colorSchema: ColorsKey): {
  background: ColorT;
  text: ColorT;
} {
  return schema[colorSchema as SchemaKey];
}

export enum ColorsKey {
  RED = 'red',
  BLUE = 'blue',
  BLACK = 'black',
  GRAY = 'gray',
  TEXTGRAY = 'textgray',
  GREEN = 'green',
  WHITE = 'white',
  ORANGE = 'orange',
}

export const schemaColorCrard: ColorItemCardT[] = [
  {
    name: ColorsKey.TEXTGRAY,
    background: 'WHITE',
    text: 'SECOND',
  },
  {
    name: ColorsKey.BLUE,
    background: 'ACCENT',
    text: 'TEXT',
  },
  {
    name: ColorsKey.BLACK,
    background: 'MAIN',
    text: 'TEXT',
  },
  {
    name: ColorsKey.GRAY,
    background: 'SECOND',
    text: 'WHITE',
  },

  {
    name: ColorsKey.GREEN,
    background: 'TEXT',
    text: 'ACCENT',
  },
  {
    name: ColorsKey.WHITE,
    background: 'WHITE',
    text: 'RED',
  },
  {
    name: ColorsKey.RED,
    background: 'RED',
    text: 'WHITE',
  },
  {
    name: ColorsKey.ORANGE,
    background: 'ORANGE',
    text: 'WHITE',
  },
];
