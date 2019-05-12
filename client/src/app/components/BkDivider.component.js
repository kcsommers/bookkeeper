import React from 'react';
import {
  View
} from 'react-native';

export default class BkDivider extends React.Component {
  render() {
    const { backgroundColor, isVertical } = this.props;
    return (
      <View
        style={[{
          backgroundColor,
          width: isVertical ? 1 : '100%',
          height: '100%',
          borderRadius: 3
        }]}
      />
    );
  }
}