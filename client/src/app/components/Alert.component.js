import React from 'react';
import {
  StyleSheet, Text, TouchableWithoutFeedback, Animated, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  normalizeFont, appColors, appHeights, appWidths, appZindex
} from '../../assets/styles/appStyles.styles';

const alertStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: appZindex.z8,
  },
  contentWrapper: {
    width: appWidths.eightyFive,
    height: appHeights.twentyFive,
    backgroundColor: 'rgba(247, 247, 247, 0.9)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Lato',
    fontSize: normalizeFont(25),
    color: '#444',
    textAlign: 'center'
  }
});

class AlertComponent extends React.Component {
  constructor(props) {
    super(props);
    this._closeAlert = this._closeAlert.bind(this);
    this._animateIn = this._animateIn.bind(this);
    this._animateOut = this._animateOut.bind(this);
    this.alertAnim = new Animated.Value(0);
  }

  componentDidMount() {
    this._animateIn();
  }

  _closeAlert() {
    const { alert, closeAlert } = this.props;
    closeAlert(alert.id);
  }

  _animateIn() {
    Animated.timing(this.alertAnim, {
      toValue: 1,
      duration: 300
    }).start(() => {
      this.timeout = setTimeout(() => {
        this._animateOut();
      }, 2000);
    });
  }

  _animateOut() {
    Animated.timing(this.alertAnim, {
      toValue: 0,
      duration: 300
    }).start(() => {
      this._closeAlert();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          clearTimeout(this.timeout);
          this._animateOut();
        }}
      >
        <View style={[alertStyles.container]}>
          <Animated.View style={[alertStyles.contentWrapper, {
            opacity: this.alertAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            }),
            transform: [{
              scale: this.alertAnim.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0.7, 1.2, 1]
              })
            }]
          }]}
          >
            <Text style={alertStyles.text}>{alert.content}</Text>
            <Icon
              name={alert.icon}
              size={normalizeFont(20)}
              color={appColors.gray}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AlertComponent;