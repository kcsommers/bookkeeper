import { StyleSheet } from 'react-native';
import { appWidths, appSpacing, appColors } from '../appStyles.styles';

export const styles = StyleSheet.create({
  bookBtn: {
    flexDirection: 'row'
  },
  thumbnailWrapper: {
    width: appWidths.thirtyFive,
    height: appWidths.thirtyFive * 1.54
  },
  thumbnail: {
    width: '100%',
    height: '100%'
  },
  descrText: {
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: appSpacing.sm.x
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bookOption: {
    backgroundColor: appColors.offWhite,
    width: appWidths.fifteen,
    height: appWidths.fifteen,
    borderRadius: appWidths.fifteen / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});