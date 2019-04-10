import {
  StyleSheet
} from 'react-native';
import {
  appColors, appWidths, appHeights, appSpacing
} from '../appStyles.styles';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: appSpacing.sm.x,
    paddingRight: appSpacing.sm.x
  },
  userImage: {
    borderWidth: 2,
    borderColor: appColors.offWhite,
    borderRadius: appWidths.forty / 2,
    width: appWidths.forty,
    height: appWidths.forty,
    position: 'relative'
  },
  banner: {
    borderWidth: 2,
    borderColor: appColors.offWhite,
    borderRadius: 5,
    width: appWidths.ninetyFive,
    height: appHeights.twenty,
    position: 'relative'
  },
  formItem: {
    marginTop: appSpacing.md.y,
    marginBottom: appSpacing.md.y
  },
  inputWrapper: {
    borderBottomColor: appColors.gray,
    borderBottomWidth: 1,
    marginTop: appSpacing.sm.y,
    paddingBottom: appSpacing.sm.y
  },
  formLabel: {
    marginBottom: appSpacing.sm.y,
  },
  imageWrapper: {
    position: 'relative',
    alignSelf: 'center',
    alignItems: 'center'
  },
  editBtn: {
    position: 'absolute',
    backgroundColor: appColors.white,
    width: appWidths.ten,
    height: appWidths.ten,
    borderRadius: appWidths.ten / 2,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  userImgEditBtn: {
    bottom: 0
  },
  saveBtn: {
    backgroundColor: appColors.aqua,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y,
    borderRadius: 3
  }
});