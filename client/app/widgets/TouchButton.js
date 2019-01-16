import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { appStyles, SCREEN_HEIGHT, normalizeFont } from '../../assets/styles/appStyles';

const colors = {
  primary: '#fff',
  danger: '#c13149'
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderRadius: 3,
    padding: SCREEN_HEIGHT * 0.03
  },
  text: {
    color: '#444',
    textAlign: 'center',
    fontSize: normalizeFont(15),
    fontFamily: 'Merriweather'
  }
});

class TouchButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, appStyles.boxShadow, {
          backgroundColor: colors[this.props.type]
        }]}
        onPress={this.props.handlePress}
      >
        <Text style={[styles.text]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

export default TouchButton;