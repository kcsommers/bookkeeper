import { StyleSheet } from 'react-native';
import { appWidths, appColors, appSpacing } from '../appStyles.styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: appSpacing.lg.y
  },
  topWrapper: {
    flexDirection: 'row'
  },
  detailsContainer: {
    flex: 1
  },
  thumbnail: {
    borderWidth: 2,
    borderColor: appColors.offWhite,
    borderRadius: 5,
    width: appWidths.thirtyFive,
    height: appWidths.thirtyFive * 1.54
  }
});