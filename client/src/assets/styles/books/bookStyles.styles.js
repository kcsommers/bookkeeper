import { StyleSheet } from 'react-native';
import {
  appColors, appHeights, appSpacing, appWidths, normalizeFont
} from '../appStyles.styles';

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const componentStyles = StyleSheet.create({
  whiteGradientBg: {
    width: appWidths.full,
    height: appHeights.seventy
  },
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appSpacing.lg.y * 2,
    paddingBottom: appSpacing.lg.y
  },
  thumbnail: {
    width: appWidths.fiftyFive,
    height: appWidths.fiftyFive * 1.54,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: appColors.offWhite
  },
  infoText: {
    paddingVertical: appSpacing.sm.y,
    textAlign: 'center'
  },
  notesContainer: {
    backgroundColor: appColors.offWhite,
    paddingHorizontal: appSpacing.sm.x
  }
});

export const menuStyles = StyleSheet.create({
  menuContainer: {
  },
  mainBtnsContainer: {
    flexDirection: 'row'
  },
  menuBtn: {
    backgroundColor: appColors.offWhite,
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: appSpacing.md.y,
    paddingHorizontal: appSpacing.md.x,
    alignItems: 'center',
    marginHorizontal: appSpacing.sm.x,
  },
  menuBtnText: {
    fontSize: normalizeFont(16),
    fontFamily: 'Lato',
    color: appColors.teal
  },
  addNoteBtn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  currentReadBtn: {
    flex: 0.5,
    justifyContent: 'center',
  },
  moreBtnContainer: {
    alignItems: 'flex-end'
  },
  noteControlsContainer: {
    flexDirection: 'row',
    paddingBottom: appSpacing.md.y,
    backgroundColor: appColors.offWhite
  },
  noteControlsBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: appColors.offWhite,
    paddingVertical: appSpacing.md.y
  }
});

export const previewStyles = StyleSheet.create({
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

export const searchResultStyles = StyleSheet.create({
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