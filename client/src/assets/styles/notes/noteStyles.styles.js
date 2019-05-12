import { StyleSheet } from 'react-native';
import { appColors, appSpacing, appWidths, normalizeFont, appHeights } from '../appStyles.styles';

export const screenStyles = StyleSheet.create({
  saveBtn: {
    marginRight: appSpacing.sm.x
  },
  saveBtnText: {
    color: appColors.offWhite,
    fontSize: normalizeFont(14)
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: appColors.offWhite
  },
  mainInputContainer: {
    backgroundColor: appColors.offWhite,
    flex: 1,
    position: 'relative',
  },
  input: {
    fontSize: normalizeFont(18),
    color: appColors.gray,
    flex: 1,
  },
  activeIcon: {
    position: 'absolute',
    opacity: 0.3
  },
  footer: {
    borderBottomWidth: 2,
    borderBottomColor: appColors.teal,
    backgroundColor: appColors.offWhite,
  },
  inactiveTypeContainer: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  inactiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.aqua,
    width: appWidths.forty,
    justifyContent: 'center',
    paddingVertical: appSpacing.md.y,
    opacity: 0.7,
    borderTopLeftRadius: 3
  },
  inactiveText: {
    textAlign: 'right',
    fontSize: normalizeFont(16),
    color: appColors.offWhite
  },
  inactiveIcon: {
    position: 'absolute',
    opacity: 0.4,
    right: 0,
    bottom: 0
  },
  pageRefInputContainer: {
    backgroundColor: appColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: appSpacing.sm.x
  },
  pageRefLabel: {
    color: appColors.transGray,
  },
  pageRefInput: {
    paddingHorizontal: appSpacing.md.x,
    paddingVertical: appSpacing.md.y,
    flex: 1
  }
});

export const cardStyles = StyleSheet.create({
  noteCardBtn: {
    backgroundColor: appColors.white,
    marginVertical: appSpacing.sm.y
  },
  noteCardContainer: {
    backgroundColor: appColors.white,
    marginVertical: appSpacing.sm.y,
    borderRadius: 3
  },
  noteText: {
    color: appColors.gray,
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: appColors.transGray,
    marginTop: appSpacing.md.y,
    paddingTop: appSpacing.sm.y
  },
  cardScrollContainer: {
    height: appHeights.sixty
  }
});