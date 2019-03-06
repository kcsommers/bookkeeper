import React from 'react';
import {
  View,
  Text
} from 'react-native';

class NoteDisplay extends React.Component {
  render() {
    const { note } = this.props;
    return (
      <View>
        <Text>{note.content}</Text>
      </View>
    );
  }
}

export default NoteDisplay;