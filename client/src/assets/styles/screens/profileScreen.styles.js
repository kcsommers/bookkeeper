import { StyleSheet } from 'react-native';
import {
  appStyles, appWidths, appHeights, appColors, normalizeFont
} from '../appStyles.styles';

export const styles = StyleSheet.create({
  profilePic: {
    width: appWidths.forty,
    height: appWidths.forty,
    borderRadius: appWidths.forty / 2,
    borderColor: appColors.offWhite,
    borderWidth: 2
  },
  banner: {
    width: appWidths.full,
    height: appHeights.thirty
  }
});