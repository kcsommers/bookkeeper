import { StyleSheet } from 'react-native';
import {
  appColors, appHeights, appSpacing, appWidths
} from '../appStyles.styles';

export const bookStyles = StyleSheet.create({
  whiteGradientBg: {
    width: appWidths.full,
    height: appHeights.seventy
  },
  bookInfoContainer: {
    marginTop: appHeights.thirtyFive,
    alignItems: 'center'
  },
  bookOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: appSpacing.lg.y,
    paddingBottom: appSpacing.lg.y
  },
  bookOptionsBtn: {
    width: appWidths.thirty,
    height: appWidths.thirty,
    borderRadius: appWidths.thirty / 2,
    borderWidth: 1,
    borderColor: appColors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesContainer: {
    backgroundColor: appColors.offWhite
  }
});