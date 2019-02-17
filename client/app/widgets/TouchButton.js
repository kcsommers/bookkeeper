import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { appStyles, normalizeFont } from '../../assets/styles/appStyles';


const styles = {
  flat: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  primary: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    backgroundColor: '#fff'
  },
  danger: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    backgroundColor: '#c13149'
  },
  disabledStyle: {
    opacity: 0.2
  }
};

const commonStyles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderRadius: 3,
    padding: appStyles.paddingMd.y,
  },
  text: {
    color: '#444',
    textAlign: 'center',
    fontSize: normalizeFont(16),
    fontFamily: 'Merriweather'
  }
});

class TouchButton extends React.Component {
  render() {
    const { isDisabled, type, text } = this.props;
    const opacity = isDisabled ? 0.4 : 1;
    return (
      <TouchableOpacity
        style={[commonStyles.button, styles[type]]}
        onPress={this.props.onPress}
      >
        <Text style={[commonStyles.text, { opacity }]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default TouchButton;