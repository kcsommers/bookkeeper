import React from 'react';
import {
  Animated, Button, Keyboard, Text, TextInput,
  TouchableOpacity, TouchableWithoutFeedback, View, Image
} from 'react-native';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import { setUser } from '../../core/redux/actions/user.actions';
import {
  appHeights, appStyles, appSpacing, appColors
} from '../../assets/styles/appStyles.styles';
import { AuthService } from '../../core/services/AuthService';
import { loginStyles } from '../../assets/styles/loginScreen.styles';
import { initializeStore } from '../../core/redux/store';

const auth = Object.create(AuthService);
const mapStateToProps = state => state;
const mapActionsToProps = { setUser };

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.loginAnim = new Animated.Value(0);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow(event) {
    Animated.parallel([
      Animated.timing(this.loginAnim, {
        duration: event.duration,
        toValue: 1
      })
    ]).start();
  }

  _keyboardWillHide(event) {
    Animated.parallel([
      Animated.timing(this.loginAnim, {
        duration: event.duration,
        toValue: 0
      })
    ]).start();
  }

  async _handleSubmit() {
    const { username, password } = this.state;
    auth.logUserIn({ username, password }).then((user) => {
      initializeStore(user);
      this.props.navigation.navigate('App');
    }).catch((loginError) => {
      console.log('IN LOGIN SCREEN, ERROR LOGGING IN', loginError);
    });
  }

  _handleChange(value, field) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <View style={[loginStyles.mainContainer]}>
          <Animated.View style={[{
            height: this.loginAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [appHeights.fifty, appHeights.thirtyFive]
            }),
            display: 'flex',
            justifyContent: 'flex-end',
          }, appStyles.paddingLg]}
          >
            <Image
              source={logo}
              resizeMode="contain"
              style={{ height: '85%' }}
            />
          </Animated.View>
          <View style={[loginStyles.loginFormContainer, appStyles.paddingMd]}>
            <View style={[loginStyles.inputWrapper, appStyles.paddingSm]}>
              <TextInput
                placeholder="Username"
                placeholderTextColor={appColors.offWhite}
                textContentType="username"
                returnKeyLabel="Submit"
                clearButtonMode="while-editing"
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                selectTextOnFocus={true}
                onChangeText={(value) => { this._handleChange(value, 'username'); }}
                style={loginStyles.input}
              />
            </View>
            <View style={[loginStyles.inputWrapper, appStyles.paddingSm]}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={appColors.offWhite}
                textContentType="password"
                secureTextEntry={true}
                returnKeyLabel="Submit"
                clearButtonMode="while-editing"
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                selectTextOnFocus={true}
                onChangeText={(value) => { this._handleChange(value, 'password'); }}
                style={loginStyles.input}
              />
            </View>
          </View>

          <View style={[{ marginLeft: 'auto', paddingRight: appSpacing.md.x }]}>
            <TouchableOpacity>
              <Text style={[loginStyles.forgotPswdBtnText]}>
                Forgot your Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[appStyles.paddingMd, { alignSelf: 'stretch' }]}>
            <TouchableOpacity
              onPress={this._handleSubmit}
              style={[appStyles.paddingMd, loginStyles.loginBtn]}
            >
              <Text style={[loginStyles.loginBtnText]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[loginStyles.signupContainer]}>
            <Text style={[loginStyles.signupContainerText]}>
              {'Don\'t have an account?'}
            </Text>
            <Button
              color={appColors.offWhite}
              title="Sign up"
              onPress={() => { this.props.navigation.navigate('Signup'); }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(LoginScreen);
