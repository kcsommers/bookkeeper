import { StyleSheet } from 'react-native';
import {
  appWidths, appHeights, appColors, appSpacing
} from '../appStyles.styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.offWhite
  },
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
  },
  addListBtnContainer: {
    paddingLeft: appSpacing.sm.x,
    paddingRight: appSpacing.sm.x,
    marginBottom: appSpacing.lg.y
  },
  addListBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: appColors.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addListBtnIconWrapper: {
    backgroundColor: appColors.white,
    width: appWidths.fifteen,
    height: appWidths.fifteen,
    borderRadius: appWidths.fifteen / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});