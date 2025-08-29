export const typography = {
  h1: {
    fontSize: 40,
    fontFamily: 'Raleway-Regular',
    lineHeight: 48,
  },
  h2: {
    fontSize: 36,
    fontFamily: 'Raleway-Light',
    lineHeight: 40,
  },
  h3: {
    fontSize: 30,
    fontFamily: 'Raleway-Light',
    lineHeight: 38,
  },
  h4: {
    fontSize: 24,
    fontFamily: 'Raleway-Regular',
    lineHeight: 29,
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    lineHeight: 21,
  },
  subtitler: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    lineHeight: 16,
  },
  subtitlemin: {
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    lineHeight: 17,
  },
  caption: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 15,
  },
  captionbig: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    lineHeight: 18,
  },

  Bh1: {
    fontSize: 40,
    fontFamily: 'Raleway-Bold',
  },
  Bh2: {
    fontSize: 36,
    fontFamily: 'Raleway-Bold',
    lineHeight: 40,
  },
  Bh3: {
    fontSize: 30,
    fontFamily: 'Raleway-Bold',
    lineHeight: 38,
  },
  Bh4: {
    fontSize: 24,
    fontFamily: 'Raleway-Bold',
    lineHeight: 29,
  },
  Bheadline: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    lineHeight: 24,
  },
  Bbody: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    lineHeight: 24,
  },
  Bsubtitle: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    lineHeight: 21,
  },
  Bcaption: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    lineHeight: 15,
  },
} as const;

export type TypographyT = keyof typeof typography;
