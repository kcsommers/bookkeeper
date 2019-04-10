import { StyleSheet } from 'react-native';
import { appSpacing, appColors, normalizeFont, appWidths } from '../appStyles.styles';

export const styles = StyleSheet.create({
  listName: {
    textAlign: 'center',
    marginTop: appSpacing.lg.y,
    marginBottom: appSpacing.lg.y
  },
  bookWrapper: {
    position: 'relative',
    marginBottom: appSpacing.lg.y
  },
  bookOptionsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  bookOption: {
    backgroundColor: appColors.offWhite,
    width: appWidths.fifteen,
    height: appWidths.fifteen,
    borderRadius: appWidths.fifteen / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  thumbnail: {
    height: appWidths.sixtyFive * 1.54,
    width: appWidths.sixtyFive,
    borderRadius: 3,
  },
  deleteBtn: {
    alignItems: 'center',
    marginTop: appSpacing.md.y,
    marginBottom: appSpacing.md.y
  },
  deleteBtnText: {
    fontSize: normalizeFont(16),
    fontFamily: 'Merriweather',
    color: appColors.red
  }
});