import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppStyling, SCREEN_HEIGHT } from '../../assets/styles/appStyles';

const AppStyles = new AppStyling();

const colors = {
  primary: '#71a7a9',
  danger: '#c13149'
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderRadius: 100,
    padding: SCREEN_HEIGHT * 0.02
  },
  text: {
    color: '#fefefe',
    textAlign: 'center',
    fontSize: AppStyles.normalizeFont(15),
    fontFamily: 'Merriweather'
  }
});

class TouchButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[styles.button, {
        backgroundColor: colors[this.props.type]
      }]}
      >
        <Text style={[styles.text]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

export default TouchButton;