import {
  StyleSheet
} from 'react-native';
import {
  appColors, appWidths
} from '../appStyles.styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  userImage: {
    borderWidth: 2,
    borderColor: appColors.offWhite,
    borderRadius: 5,
    width: appWidths.twentyFive,
    height: appWidths.twentyFive * 1.54
  },
  banner: {
    borderWidth: 2,
    borderColor: appColors.offWhite,
    borderRadius: 5,
    width: appWidths.twentyFive,
    height: appWidths.twentyFive * 1.54
  }
});