import axios from 'axios';
import { SecureStore } from 'expo';
import React from 'react';
import {
  Animated, Button, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image
} from 'react-native';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import Environment from '../../environment';
import { setUser } from '../redux/actions/userActions';
import {
  appHeights, appStyles, normalizeFont, appSpacing, appColors
} from '../../assets/styles/appStyles';

const mapStateToProps = state => state;
const mapActionsToProps = { setUser };
const styles = StyleSheet.create({
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
  signupContainer: {
    justifyContent: 'center',
    flex: 1
  }
});

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

  async _setToken(token) {
    return SecureStore.setItemAsync('token', token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED
    });
  }

  async _handleSubmit() {
    const url = `${Environment.BASE_URL}/users/login`;
    const { username, password } = this.state;
    try {
      const loginResults = await axios.post(url, { username, password });
      const { token, user, error } = loginResults.data;
      if (!error && token) {
        this._setToken(token).then(() => {
          console.log('TOKEN SET');
          if (user) {
            this.props.screenProps.logUserIn(user);
          } else {
            console.log('NO USER SENT WITH TOKEN');
            this.props.navigation.navigate('Login');
          }
        }).catch((setTokenError) => {
          console.log('ERROR SETTING TOKEN', setTokenError);
        });
      } else {
        console.log('ERROR LOGGING IN', error);
      }
    } catch (error) {
      console.warn('ERROR LOGGING IN', error);
    }
  }

  _handleChange(value, field) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <View style={[styles.mainContainer]}>
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
          <View style={[styles.loginFormContainer, appStyles.paddingMd]}>
            <View style={[styles.inputWrapper, appStyles.paddingSm]}>
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
                style={styles.input}
              />
            </View>
            <View style={[styles.inputWrapper, appStyles.paddingSm]}>
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
                style={styles.input}
              />
            </View>
          </View>

          <View style={[{ marginLeft: 'auto', paddingRight: appSpacing.md.x }]}>
            <TouchableOpacity>
              <Text style={{
                textAlign: 'right',
                color: appColors.offWhite,
              }}
              >
                Forgot your Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[appStyles.paddingMd, { alignSelf: 'stretch' }]}>
            <TouchableOpacity
              onPress={this._handleSubmit}
              style={[
                appStyles.paddingMd,
                { backgroundColor: appColors.blue, borderRadius: 100 }
              ]}
            >
              <Text style={[
                {
                  color: appColors.offWhite,
                  fontSize: normalizeFont(16),
                  textAlign: 'center'
                }
              ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.signupContainer]}>
            <Text style={{ color: appColors.offWhite, textAlign: 'center' }}>
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
