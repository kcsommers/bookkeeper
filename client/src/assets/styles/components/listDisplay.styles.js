import { StyleSheet } from 'react-native';
import { appColors, appSpacing, appWidths } from '../appStyles.styles';

export const styles = StyleSheet.create({
  listCard: {
    marginBottom: appSpacing.lg.y,
    backgroundColor: appColors.white
  },
  thumbnailsWrapper: {
    flexDirection: 'row',
    marginTop: appSpacing.md.y,

  },
  thumbnail: {
    width: appWidths.twenty,
    height: appWidths.twenty * 1.54,
    borderRadius: 3
  },
  addBtn: {
    borderWidth: 1,
    borderColor: appColors.gray,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBtnIconWrapper: {
    width: appWidths.fifteen,
    height: appWidths.fifteen,
    borderRadius: appWidths.fifteen / 2,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
});