export enum COLOR {
  MAIN = '#101010',
  MAIN50 = '#1010107c',
  MAIN20 = '#10101038',
  TEXT = '#cacaca',
  SECOND = '#313131',
  SECOND50 = '#31313183',
  ACCENT = '#008394',
  ACCENT50 = '#00839480',
  WHITE = '#eeeeee',
  BLUE = '#003546',
  BLUE50 = '#0035467a',
  RED = '#ff583bff',
  ORANGE = '#832900',
}
export const colors = {
  MAIN: '#101010',
  MAIN50: '#1010107c',
  MAIN20: '#10101038',
  TEXT: '#cacaca',
  SECOND: '#313131',
  SECOND50: '#31313183',
  ACCENT: '#008394',
  ACCENT50: '#00839480',
  WHITE: '#eeeeee',
  BLUE: '#003546',
  BLUE50: '#0035467a',
  RED: '#ff583bff',
  ORANGE: '#832900',
} as const;

export type ColorT = keyof typeof colors;

export const BORDER = { BIG: 30, SMALL: 7 } as const;
