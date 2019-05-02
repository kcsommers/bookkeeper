import { StyleSheet } from 'react-native';
import { appColors, appSpacing, normalizeFont, appHeights } from '../appStyles.styles';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: appSpacing.lg.y,
    backgroundColor: appColors.offWhite
  },
  displayOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayOptionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: appSpacing.md.x
  },
  listNameContainer: {
    marginBottom: appSpacing.md.y
  },
  listName: {
    textAlign: 'center'
  },
  booksContainerCol: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  booksContainerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  bookWrapper: {
    marginTop: appSpacing.md.y,
    marginBottom: appSpacing.md.y,
    position: 'relative',
  },
  thumbnail: {
    borderRadius: 3,
    width: '100%',
    height: '100%'
  },
  dropdownContainer: {
    position: 'absolute',
    left: appSpacing.sm.x,
    right: appSpacing.sm.x,
    bottom: appSpacing.md.y
  },
  deleteBtn: {
    alignItems: 'center',
    marginTop: appSpacing.sm.y,
    marginBottom: appSpacing.md.y,
    marginHorizontal: appSpacing.md.x,
    paddingVertical: appSpacing.md.y,
    backgroundColor: appColors.red,
    borderRadius: 3
  },
  deleteBtnText: {
    fontSize: normalizeFont(16),
    fontFamily: 'Lato',
    color: appColors.offWhite
  }
});