import {createTheme} from '@shopify/restyle';
import {Dimensions} from 'react-native';

import {
  fontFamily,
  fontSizes,
  fontWeights,
  textVariants,
} from './text-variants';

import {colors} from './colors';

const {width, height} = Dimensions.get('window');

const sizes = {
  full: '100%',
  width,
  height,
  sideSpace: 20,
  safeWidth: width - 20 - 20,
  activeOpacity: 0.8,
  minHeaderHeight: 60,
};

const spacing = {
  0: 0,
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 12,
  6: 16,
  7: 20,
  8: 24,
  9: 28,
  10: 32,
  12: 36,
  14: 40,
  16: 44,
  18: 48,
  20: 56,
  22: 64,
  24: 80,
  26: 96,
  27: 192,
};

const borderRadii = {
  none: 0,
  'rounded-xs': 4,
  'rounded-sm': 8,
  rounded: 12,
  'rounded-md': 16,
  'rounded-lg': 20,
  'rounded-xl': 24,
  'rounded-xxl': 28,
  'rounded-hu': 33,
  'rounded-full': 9999,
};

const zIndices = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
};

const theme = createTheme({
  colors,
  borderRadii,
  textVariants,
  spacing,
  fontWeights,
  fontFamily,
  fontSizes,
  sizes,
  zIndices,
});

export type Theme = typeof theme;

export default theme;
