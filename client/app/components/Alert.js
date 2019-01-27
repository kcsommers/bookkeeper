import React from 'react';
import {
  StyleSheet, View, Text, Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { appStyles, normalizeFont } from '../../assets/styles/appStyles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(247, 247, 247, 0.9)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: appStyles.heightPcts.eightyFive,
    height: appStyles.heightPcts.thirtyFive
  },
  text: {
    fontFamily: 'Merriweather',
    fontSize: normalizeFont(25),
    color: '#444'
  }
});

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.alertAnim = new Animated.Value(0);
    this._animateIn = this._animateIn.bind(this);
    this._animateOut = this._animateOut.bind(this);
  }

  componentDidMount() {
    this._animateIn();
  }

  _animateIn() {
    Animated.timing(this.alertAnim, {
      duration: 300,
      toValue: 1
    }).start(() => {
      setTimeout(() => {
        this._animateOut();
      }, 1500);
    });
  }

  _animateOut() {
    Animated.timing(this.alertAnim, {
      duration: 300,
      toValue: 0
    }).start(() => {
      this.props.onFinish();
    });
  }

  render() {
    const { message, icon } = this.props.content;
    return (
      <View style={{
        zIndex: 5000, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
      }}
      >
        <Animated.View
          onLoad={this._animateIn}
          style={[styles.container, {
            opacity: this.alertAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            }),
            transform: [{
              scale: this.alertAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.5, 1.2, 1]
              })
            }]
          }]}
        >
          <Text style={styles.text}>{message}</Text>
          <Icon name={icon} size={50} color="#444" />
        </Animated.View>
      </View>
    );
  }
}

export default Alert;