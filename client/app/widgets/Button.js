import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AppStyles from '../../assets/styles/appStyles';

class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        title={this.props.text}
        style={AppStyles[this.props.type].wrapper}
      >
        <Text style={AppStyles[this.props.type].text}>Update</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;