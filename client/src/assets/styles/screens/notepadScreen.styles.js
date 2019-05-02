import { StyleSheet } from 'react-native';
import { appColors, normalizeFont, appSpacing } from '../appStyles.styles';

export const styles = StyleSheet.create({
  saveBtn: {
    marginRight: appSpacing.sm.x
  },
  saveBtnText: {
    color: appColors.offWhite,
    fontSize: normalizeFont(14)
  },
  container: {
    backgroundColor: appColors.offWhite,
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between'
  },
  input: {
    fontSize: normalizeFont(20),
    height: 291,
    color: appColors.gray
  },
  backgroundIcon: {
    position: 'absolute',
    opacity: 0.4
  }
});