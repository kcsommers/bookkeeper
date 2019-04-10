import { StyleSheet } from 'react-native';
import { appColors, appSpacing, normalizeFont } from './appStyles.styles';

export const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: appColors.offWhite,
    borderRadius: 3
  },
  modalInput: {
    backgroundColor: appColors.white,
    fontSize: normalizeFont(16),
    color: appColors.gray,
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y,
    paddingLeft: appSpacing.sm.x,
    paddingRight: appSpacing.sm.x,
    marginTop: appSpacing.md.y,
    marginBottom: appSpacing.md.y,
    borderRadius: 3
  },
  addBtn: {
    backgroundColor: appColors.red,
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y,
    alignItems: 'center',
    borderRadius: 3
  }
});

export const noteStyles = StyleSheet.create({
  noteText: {
    color: appColors.offWhite,
    fontSize: normalizeFont(20)
  }
});