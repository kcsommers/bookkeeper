import { StyleSheet } from 'react-native';
import { appColors, appSpacing, normalizeFont } from '../appStyles.styles';

export const loginStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: appColors.aqua,
    alignItems: 'center',
    flex: 1
  },
  loginFormContainer: {
    alignSelf: 'stretch'
  },
  inputWrapper: {
    borderBottomColor: appColors.offWhite,
    borderBottomWidth: 2,
    marginTop: appSpacing.sm.y,
    marginBottom: appSpacing.sm.y
  },
  input: {
    fontSize: normalizeFont(18),
    color: appColors.offWhite
  },
  loginBtn: {
    backgroundColor: appColors.blue,
    borderRadius: 100
  },
  loginBtnText: {
    color: appColors.offWhite,
    fontSize: normalizeFont(16),
    textAlign: 'center'
  },
  forgotPswdBtnText: {
    textAlign: 'right',
    color: appColors.offWhite,
  },
  signupContainer: {
    justifyContent: 'center',
    flex: 1
  },
  signupContainerText: {
    color: appColors.offWhite,
    textAlign: 'center'
  }
});