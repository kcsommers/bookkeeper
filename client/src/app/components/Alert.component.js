import React from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
  normalizeFont, appColors, appHeights
} from '../../assets/styles/appStyles.styles';

const alertStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(247, 247, 247, 0.9)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: appHeights.eightyFive,
    height: appHeights.thirtyFive,
    position: 'absolute'
  },
  text: {
    fontFamily: 'Merriweather',
    fontSize: normalizeFont(25),
    color: '#444',
    textAlign: 'center'
  }
});

class AlertComponent extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this._animateOut();
    }, 3000);
  }

  componentWillUnmount() {
    console.log('ALERT COMPONENT UNMOUNTING');
  }

  _animateOut() {
    const { alert, closeAlert } = this.props;
    closeAlert(alert.id);
  }

  render() {
    const { alert } = this.props;
    return (
      <View style={[alertStyles.container]}>
        <Text style={alertStyles.text}>{alert.content}</Text>
        <Icon
          name={alert.icon}
          size={normalizeFont(20)}
          color={appColors.gray}
        />
      </View>
    );
  }
}

export default AlertComponent;