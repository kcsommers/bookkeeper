import { StyleSheet } from 'react-native';
import {
  appStyles, appWidths, appHeights, appColors, normalizeFont, appSpacing
} from '../appStyles.styles';

export const styles = StyleSheet.create({
  bannerContainer: {
    position: 'relative'
  },
  profilePic: {
    width: appWidths.forty,
    height: appWidths.forty,
    borderRadius: appWidths.forty / 2,
    borderColor: appColors.offWhite,
    borderWidth: 2,
    position: 'absolute',
    left: appWidths.fifty,
    bottom: 0,
    transform: [
      { translateX: -appWidths.forty / 2 },
      { translateY: appWidths.forty / 8 }
    ]
  },
  banner: {
    width: appWidths.full,
    height: appHeights.thirty,
  },
  userInfo: {
    paddingTop: appSpacing.lg.y,
    paddingBottom: appSpacing.lg.y
  },
  centered: {
    textAlign: 'center'
  }
});