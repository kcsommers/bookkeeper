import { StyleSheet } from 'react-native';
import { appColors, appHeights, appSpacing, normalizeFont } from '../appStyles.styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.offWhite,
    height: appHeights.ten,
    justifyContent: 'center',
    paddingLeft: appSpacing.lg.x,
    paddingRight: appSpacing.lg.x,
  },
  inputWrapper: {
    backgroundColor: appColors.white,
    flexDirection: 'row',
    borderRadius: 50
  },
  searchInput: {
    fontSize: normalizeFont(18),
    flex: 1,
    color: appColors.gray,
    paddingLeft: appSpacing.md.x,
    paddingTop: appSpacing.sm.y,
    paddingBottom: appSpacing.sm.y
  },
  searchIconWrapper: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  }
});