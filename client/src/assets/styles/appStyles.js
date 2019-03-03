import { Dimensions, PixelRatio, Platform } from 'react-native';

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
  ninety: SCREEN_WIDTH * 0.9,
  eightyFive: SCREEN_WIDTH * 0.85,
  eighty: SCREEN_WIDTH * 0.8,
  seventyFive: SCREEN_WIDTH * 0.75,
  fifty: SCREEN_WIDTH * 0.5
};

export const appHeights = {
  full: SCREEN_HEIGHT,
  eightyFive: SCREEN_HEIGHT * 0.85,
  seventy: SCREEN_HEIGHT * 0.7,
  fifty: SCREEN_HEIGHT * 0.5,
  thirtyFive: SCREEN_HEIGHT * 0.35,
  ten: SCREEN_HEIGHT * 0.1,
  five: SCREEN_HEIGHT * 0.05
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
  aqua: '#71a7a9',
  offWhite: '#f1f3ee',
  red: '#c13149'
};

export const appStyles = {
  h2: {
    fontSize: normalizeFont(24),
    fontFamily: 'MerrItalic'
  },
  h3: {
    fontSize: normalizeFont(20),
    fontFamily: 'Merriweather'
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
  },
  paddingSm: {
    paddingLeft: SCREEN_WIDTH * 0.02,
    paddingRight: SCREEN_WIDTH * 0.02,
    paddingTop: SCREEN_HEIGHT * 0.007,
    paddingBottom: SCREEN_HEIGHT * 0.007,
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
  }
};