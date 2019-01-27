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
  widthPcts: {
    full: SCREEN_WIDTH,
    ninety: SCREEN_WIDTH * 0.9,
    eightyFive: SCREEN_WIDTH * 0.85,
    eighty: SCREEN_WIDTH * 0.8,
    seventyFive: SCREEN_WIDTH * 0.75
  },
  heightPcts: {
    full: SCREEN_HEIGHT,
    thirtyFive: SCREEN_HEIGHT * 0.35
  },
  paddingSm: {
    x: SCREEN_WIDTH * 0.02,
    y: SCREEN_HEIGHT * 0.007,
  },
  paddingMd: {
    x: SCREEN_WIDTH * 0.04,
    y: SCREEN_HEIGHT * 0.02
  },
  paddingLg: {
    x: SCREEN_WIDTH * 0.06,
    y: SCREEN_HEIGHT * 0.04
  },
  buttonOutline: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    paddingTop: SCREEN_HEIGHT * 0.007,
    paddingBottom: SCREEN_HEIGHT * 0.007
  }
};
