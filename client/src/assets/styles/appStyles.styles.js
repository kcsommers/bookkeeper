import { Dimensions, PixelRatio, Platform } from 'react-native';
import { Header } from 'react-navigation';

export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

export const normalizeFont = (size) => {
  const scale = SCREEN_WIDTH / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const appWidths = {
  full: SCREEN_WIDTH,
  ninetyFive: SCREEN_WIDTH * 0.95,
  ninety: SCREEN_WIDTH * 0.9,
  eightyFive: SCREEN_WIDTH * 0.85,
  eighty: SCREEN_WIDTH * 0.8,
  seventyFive: SCREEN_WIDTH * 0.75,
  seventy: SCREEN_WIDTH * 0.7,
  sixtyFive: SCREEN_WIDTH * 0.65,
  sixty: SCREEN_WIDTH * 0.6,
  fiftyFive: SCREEN_WIDTH * 0.55,
  fifty: SCREEN_WIDTH * 0.5,
  fortyFive: SCREEN_WIDTH * 0.45,
  forty: SCREEN_WIDTH * 0.4,
  thirtyFive: SCREEN_WIDTH * 0.35,
  thirty: SCREEN_WIDTH * 0.3,
  twentyFive: SCREEN_WIDTH * 0.25,
  twenty: SCREEN_WIDTH * 0.2,
  fifteen: SCREEN_WIDTH * 0.15,
  ten: SCREEN_WIDTH * 0.1
};

export const appHeights = {
  device: SCREEN_HEIGHT,
  full: SCREEN_HEIGHT - Header.HEIGHT - (SCREEN_HEIGHT * 0.1),
  eightyFive: SCREEN_HEIGHT * 0.85,
  seventy: SCREEN_HEIGHT * 0.7,
  fifty: SCREEN_HEIGHT * 0.5,
  fortyFive: SCREEN_HEIGHT * 0.45,
  forty: SCREEN_HEIGHT * 0.4,
  thirtyFive: SCREEN_HEIGHT * 0.35,
  thirty: SCREEN_HEIGHT * 0.3,
  twentyFive: SCREEN_HEIGHT * 0.25,
  twenty: SCREEN_HEIGHT * 0.2,
  fifteen: SCREEN_HEIGHT * 0.15,
  ten: SCREEN_HEIGHT * 0.1,
  five: SCREEN_HEIGHT * 0.05,
};

export const appSpacing = {
  sm: {
    x: SCREEN_WIDTH * 0.02,
    y: SCREEN_HEIGHT * 0.007
  },
  md: {
    x: SCREEN_WIDTH * 0.04,
    y: SCREEN_HEIGHT * 0.02
  },
  lg: {
    x: SCREEN_WIDTH * 0.06,
    y: SCREEN_HEIGHT * 0.04
  }
};

export const appColors = {
  blue: '#a9c5e8',
  green: '#1c4b44',
  aqua: '#68babe',
  aqua2: '#71a7a9',
  white: '#ffffff',
  offWhite: '#f7f7f7',
  red: '#c13149',
  gray: '#4a4a4a',
  teal: '#18899d',
  orange: '#efaa82',
  purple: '#803970',
  transGray: 'rgba(74, 74, 74, 0.7)',
  transRed: 'rgba(193, 49, 73, 0.5)'
};

export const appZindex = {
  z9: 900,
  z8: 800,
  z7: 700,
  z6: 600,
  z5: 500,
  z4: 400,
  z3: 300,
  z2: 200,
  z1: 100
};

export const appStyles = {
  h1: {
    fontSize: normalizeFont(30),
    fontFamily: 'Lato',
    color: appColors.green
  },
  h2: {
    fontSize: normalizeFont(24),
    fontFamily: 'Lato',
    color: appColors.green
  },
  h2i: {
    fontSize: normalizeFont(24),
    fontFamily: 'LatoItalic',
    color: appColors.gray
  },
  h3: {
    fontSize: normalizeFont(20),
    fontFamily: 'Lato',
    color: appColors.green
  },
  h3i: {
    fontSize: normalizeFont(20),
    fontFamily: 'LatoItalic',
    color: appColors.gray
  },
  h4: {
    fontSize: normalizeFont(18),
    fontFamily: 'Lato',
    color: appColors.green
  },
  h4i: {
    fontSize: normalizeFont(18),
    fontFamily: 'LatoItalic',
    color: appColors.gray
  },
  h5: {
    fontSize: normalizeFont(14),
    fontFamily: 'Lato',
    color: appColors.green
  },
  h5i: {
    fontSize: normalizeFont(14),
    fontFamily: 'LatoItalic',
    color: appColors.gray
  },
  p: {
    fontSize: normalizeFont(13),
    color: appColors.gray
  },
  label: {
    fontSize: normalizeFont(14),
    color: appColors.gray
  },
  buttonText: {
    fontSize: normalizeFont(16),
    fontFamily: 'Lato',
    color: appColors.offWhite
  },
  buttonTextDark: {
    fontSize: normalizeFont(16),
    fontFamily: 'Lato',
    color: appColors.gray
  },
  buttonTextSm: {
    fontSize: normalizeFont(13),
    fontFamily: 'Lato',
    color: appColors.offWhite
  },
  boxShadow: {
    shadowColor: appColors.gray,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
  },
  boxShadowLeft: {
    shadowColor: appColors.gray,
    shadowOpacity: 0.2,
    shadowOffset: { width: -1, height: 2 },
    shadowRadius: 2,
  },
  paddingSm: {
    paddingLeft: SCREEN_WIDTH * 0.02,
    paddingRight: SCREEN_WIDTH * 0.02,
    paddingTop: SCREEN_HEIGHT * 0.007,
    paddingBottom: SCREEN_HEIGHT * 0.007,
  },
  marginSm: {
    marginLeft: SCREEN_WIDTH * 0.02,
    marginRight: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_HEIGHT * 0.007,
    marginBottom: SCREEN_HEIGHT * 0.007,
  },
  paddingMd: {
    paddingLeft: SCREEN_WIDTH * 0.04,
    paddingRight: SCREEN_WIDTH * 0.04,
    paddingTop: SCREEN_HEIGHT * 0.02,
    paddingBottom: SCREEN_HEIGHT * 0.02
  },
  paddingLg: {
    paddingLeft: SCREEN_WIDTH * 0.06,
    paddingRight: SCREEN_WIDTH * 0.06,
    paddingTop: SCREEN_HEIGHT * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.04
  },
  screenBuffer: {
    height: appHeights.ten,
    backgroundColor: appColors.offWhite
  },
  buttonAqua: {
    backgroundColor: appColors.aqua,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y,
  },
  buttonRed: {
    backgroundColor: appColors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y,
  }
};