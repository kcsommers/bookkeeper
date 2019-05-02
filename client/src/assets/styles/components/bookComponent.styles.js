import { StyleSheet } from 'react-native';
import {
  appColors, appHeights, appSpacing, appWidths, appStyles
} from '../appStyles.styles';

export const styles = StyleSheet.create({
  whiteGradientBg: {
    width: appWidths.full,
    height: appHeights.seventy
  },
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appSpacing.lg.y * 2,
    paddingBottom: appSpacing.lg.y
  },
  thumbnail: {
    width: appWidths.fiftyFive,
    height: appWidths.fiftyFive * 1.5,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: appColors.offWhite
  },
  bookInfoContainer: {
    alignItems: 'center'
  },
  bookOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: appSpacing.lg.y,
    paddingBottom: appSpacing.lg.y
  },
  bookOptionsBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.offWhite,
    borderRadius: 3,
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y,
  },
  notesContainer: {
    backgroundColor: appColors.offWhite
  }
});