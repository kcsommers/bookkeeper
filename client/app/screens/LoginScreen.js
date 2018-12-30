import axios from 'axios';
import React from 'react';
import { SecureStore } from 'expo';
import {
  TouchableOpacity, Button, StyleSheet, View, Text, Keyboard, Animated, TouchableWithoutFeedback
} from 'react-native';
import Input from '../widgets/Input';
import Environment from '../../environment';
import logo from '../../assets/images/logo.png';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#71a7a9',
    alignItems: 'center',
    flex: 1
  },
  title: {
    borderWidth: 1,
    borderColor: '#fefefe',
    padding: 5,
    borderRadius: 125,
    marginTop: 150,
  },
  titleInner: {
    width: '100%',
    height: '100%',
    borderRadius: 125,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fefefe',
  },
  loginForm: {
    alignSelf: 'stretch',
    paddingLeft: 25,
    paddingRight: 25
  },
  submitBtn: {
    backgroundColor: '#a9c5e8',
    alignSelf: 'stretch',
    padding: 15,
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 100
  },
  submitBtnText: {
    color: '#fefefe',
    fontSize: 22
  },
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.logoSize = new Animated.Value(250);
    this.formPadding = new Animated.Value(50);
    this.logoPaddingTop = new Animated.Value(100);
    this.logoPaddingBottom = new Animated.Value(50);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
  }

  // async handleSubmit() {
  //   const url = 'https://www.googleapis.com/books/v1/volumes?q=Moby Dick';
  //   try {
  //     const results = await axios.get(url);
  //     console.log('SEARCH RESULTS', results);
  //   } catch (err) {
  //     console.error('ERROR FINDING SEARCHRESULTS', err);
  //   }
  // }

  componentWillMount() {
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
      Animated.timing(this.logoSize, {
        duration: event.duration,
        toValue: 200
      }),
      Animated.timing(this.logoPaddingTop, {
        duration: event.duration,
        toValue: 50
      }),
      Animated.timing(this.logoPaddingBottom, {
        duration: event.duration,
        toValue: 25
      })
    ]).start();
  }

  _keyboardWillHide(event) {
    Animated.parallel([
      Animated.timing(this.formPadding, {
        duration: event.duration,
        toValue: 50
      }),
      Animated.timing(this.logoSize, {
        duration: event.duration,
        toValue: 250
      }),
      Animated.timing(this.logoPaddingTop, {
        duration: event.duration,
        toValue: 100
      }),
      Animated.timing(this.logoPaddingBottom, {
        duration: event.duration,
        toValue: 50
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
      if (loginResults.data.token) {
        this._setToken(loginResults.data.token).then(() => {
          console.log('TOKEN SET');
          this.props.navigation.navigate('HomeStack');
        }).catch((error) => {
          console.log('ERROR SETTING TOKEN', error);
        });
      } else {
        console.log('ERROR LOGGING IN', loginResults.data.error);
      }
    } catch (error) {
      console.warn('ERROR LOGGING IN');
    }
  }

  _handleChange(value, field) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <View style={[styles.mainContainer]}>

          <Animated.View style={{
            paddingTop: this.logoPaddingTop,
            paddingBottom: this.logoPaddingBottom
          }}
          >
            <Animated.Image
              source={logo}
              style={[{ width: this.logoSize, height: this.logoSize }]}
            />
          </Animated.View>

          <Animated.View
            style={[styles.loginForm, { paddingBottom: this.formPadding }]}
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

            <Text style={{ textAlign: 'right', color: '#fefefe' }}>Forgot your Password?</Text>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={this._handleSubmit}
            >
              <Text style={styles.submitBtnText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          <View>
            <Text style={{ color: '#fefefe' }}>{'Don\'t have an account?'}</Text>
            <Button
              color="#fefefe"
              title="Sign up"
              onPress={() => { this.props.navigation.navigate('Signup'); }}
            />
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default LoginScreen;
