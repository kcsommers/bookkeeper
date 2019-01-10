import axios from 'axios';
import { SecureStore } from 'expo';
import React from 'react';
import {
  Animated, Button, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import { AppStyling, SCREEN_HEIGHT } from '../../assets/styles/appStyles';
import Environment from '../../environment';
import { setUser } from '../redux/actions/userActions';
import Input from '../widgets/Input';

const AppStyles = new AppStyling();

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#71a7a9',
    alignItems: 'center',
    flex: 1
  },
  loginForm: {
    alignSelf: 'stretch',
    paddingLeft: SCREEN_HEIGHT * 0.025,
    paddingRight: SCREEN_HEIGHT * 0.025
  },
  submitBtn: {
    backgroundColor: '#a9c5e8',
    alignSelf: 'stretch',
    paddingTop: SCREEN_HEIGHT * 0.018,
    paddingBottom: SCREEN_HEIGHT * 0.018,
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.04,
    borderRadius: 100
  },
  submitBtnText: {
    color: '#fefefe',
    fontSize: AppStyles.normalizeFont(22)
  },
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this.formPadding = new Animated.Value(SCREEN_HEIGHT * 0.06);
    this.logoHeight = new Animated.Value(SCREEN_HEIGHT * 0.5);
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
      Animated.timing(this.formPadding, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      }),
      Animated.timing(this.logoHeight, {
        duration: event.duration,
        toValue: SCREEN_HEIGHT * 0.3
      })
    ]).start();
  }

  _keyboardWillHide(event) {
    Animated.parallel([
      Animated.timing(this.formPadding, {
        duration: event.duration,
        toValue: 50
      }),
      Animated.timing(this.logoHeight, {
        duration: event.duration,
        toValue: SCREEN_HEIGHT * 0.5
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
    console.log('CHANGING');
    this.setState({ [field]: value });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <View style={[styles.mainContainer]}>
          <View>
            <Animated.View style={{
              display: 'flex',
              justifyContent: 'center',
              height: this.logoHeight
            }}
            >
              <Animated.Image
                source={logo}
                resizeMode="contain"
                style={[{ height: '70%' }]}
              />
            </Animated.View>
          </View>

          <View style={[styles.loginForm]}>
            <Animated.View
              style={{ paddingBottom: this.formPadding }}
            >
              <Input
                field="username"
                placeholder="Username"
                handleChange={($value, field) => { this._handleChange($value, field); }}
                isPassword={false}
                isEmail={false}
                keyboardType="default"
                textContentType="username"
              />

              <Input
                field="password"
                placeholder="Password"
                handleChange={($value, field) => { this._handleChange($value, field); }}
                isPassword={true}
                isEmail={false}
                keyboardType="default"
                textContentType="password"
              />

              <Text
                style={{ textAlign: 'right', color: '#fefefe' }}
              >
                Forgot your Password?
              </Text>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this._handleSubmit}
              >
                <Text style={styles.submitBtnText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>

            <View>
              <Text style={{ color: '#fefefe', textAlign: 'center' }}>{'Don\'t have an account?'}</Text>
              <Button
                color="#fefefe"
                title="Sign up"
                onPress={() => { this.props.navigation.navigate('Signup'); }}
              />
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => state;
const mapActionsToProps = { setUser };

export default connect(mapStateToProps, mapActionsToProps)(LoginScreen);
