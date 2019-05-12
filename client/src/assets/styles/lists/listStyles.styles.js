import { StyleSheet } from 'react-native';
import { appColors, appSpacing, normalizeFont, appWidths } from '../appStyles.styles';

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: appSpacing.lg.y,
    backgroundColor: appColors.white
  },
  displayOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: appWidths.fortyFive,
    paddingVertical: appSpacing.sm.y,
    borderRadius: 3,
    backgroundColor: appColors.white,
    position: 'relative'
  },
  displayOptionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const componentStyles = StyleSheet.create({
  container: {
    flex: 1
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
    height: '100%',
    borderColor: appColors.offWhite,
    borderWidth: 2
  },
  dropdownContainer: {
    position: 'absolute',
    left: appSpacing.sm.x,
    right: appSpacing.sm.x,
    bottom: appSpacing.md.y
  },
  listNameContainer: {
    marginBottom: appSpacing.md.y
  },
  listName: {
    textAlign: 'center'
  },
  deleteBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: appSpacing.md.y,
    marginTop: 'auto',
    borderRadius: 3
  },
  deleteBtnText: {
    fontSize: normalizeFont(16),
    fontFamily: 'Lato',
    color: appColors.red
  }
});

export const previewStyles = StyleSheet.create({
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